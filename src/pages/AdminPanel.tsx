import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { 
  Shield, Plus, Trash2, LogOut, ArrowLeft, Loader2, 
  RefreshCw, CheckCircle, Clock, XCircle, Edit2, Save, X
} from "lucide-react";
import { toast } from "sonner";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";

interface AsnEntry {
  id: string;
  asn_number: string;
  user_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const AdminPanel = () => {
  const [entries, setEntries] = useState<AsnEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // New entry form
  const [newAsnNumber, setNewAsnNumber] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newStatus, setNewStatus] = useState("pending");
  
  // Edit form
  const [editStatus, setEditStatus] = useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchEntries();
    
    // Set up realtime subscription
    const channel = supabase
      .channel("asn_entries_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "asn_entries" }, () => {
        fetchEntries();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin-login");
      return;
    }

    // Verify admin role
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      toast.error("Access denied");
      await supabase.auth.signOut();
      navigate("/admin-login");
    }
  };

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("asn_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching entries:", error);
      toast.error("Failed to load entries");
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async () => {
    if (!newAsnNumber.trim() || !newUserName.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setAdding(true);
    try {
      const { error } = await supabase
        .from("asn_entries")
        .insert({
          asn_number: newAsnNumber.trim(),
          user_name: newUserName.trim(),
          status: newStatus,
        });

      if (error) throw error;

      toast.success("Entry added successfully");
      setNewAsnNumber("");
      setNewUserName("");
      setNewStatus("pending");
      fetchEntries();
    } catch (error: any) {
      console.error("Error adding entry:", error);
      if (error.code === "23505") {
        toast.error("This ASN number already exists");
      } else {
        toast.error("Failed to add entry");
      }
    } finally {
      setAdding(false);
    }
  };

  const updateEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from("asn_entries")
        .update({ status: editStatus })
        .eq("id", id);

      if (error) throw error;

      toast.success("Entry updated successfully");
      setEditingId(null);
      fetchEntries();
    } catch (error) {
      console.error("Error updating entry:", error);
      toast.error("Failed to update entry");
    }
  };

  const deleteEntry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      const { error } = await supabase
        .from("asn_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Entry deleted successfully");
      fetchEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error("Failed to delete entry");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "rejected":
      case "expired":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "active":
        return "text-green-500 bg-green-500/10";
      case "pending":
      case "processing":
        return "text-yellow-500 bg-yellow-500/10";
      case "rejected":
      case "expired":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={cosmicLogo} alt="Slayer Nodes" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-gradient">Admin Panel</h1>
              <span className="text-xs text-muted-foreground">ASN Management</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Link>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Add New Entry */}
          <div className="glass rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add New ASN Entry
            </h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="asnNumber" className="text-sm mb-2 block">ASN Number</Label>
                <Input
                  id="asnNumber"
                  placeholder="e.g., ASN-12345"
                  value={newAsnNumber}
                  onChange={(e) => setNewAsnNumber(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              
              <div>
                <Label htmlFor="userName" className="text-sm mb-2 block">User Name</Label>
                <Input
                  id="userName"
                  placeholder="e.g., JohnDoe"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              
              <div>
                <Label htmlFor="status" className="text-sm mb-2 block">Status</Label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button onClick={addEntry} disabled={adding} className="w-full">
                  {adding ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Entry
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Entries List */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                ASN Entries ({entries.length})
              </h2>
              <Button variant="outline" size="sm" onClick={fetchEntries}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : entries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No entries found. Add your first ASN entry above.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ASN Number</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Created</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-b border-border/50 hover:bg-card/50 transition">
                        <td className="py-3 px-4 font-mono text-sm">{entry.asn_number}</td>
                        <td className="py-3 px-4">{entry.user_name}</td>
                        <td className="py-3 px-4">
                          {editingId === entry.id ? (
                            <Select value={editStatus} onValueChange={setEditStatus}>
                              <SelectTrigger className="w-32 h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getStatusColor(entry.status)}`}>
                              {getStatusIcon(entry.status)}
                              {entry.status.toUpperCase()}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            {editingId === entry.id ? (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateEntry(entry.id)}
                                >
                                  <Save className="w-4 h-4 text-green-500" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingId(null)}
                                >
                                  <X className="w-4 h-4 text-muted-foreground" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingId(entry.id);
                                    setEditStatus(entry.status);
                                  }}
                                >
                                  <Edit2 className="w-4 h-4 text-primary" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteEntry(entry.id)}
                                >
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
