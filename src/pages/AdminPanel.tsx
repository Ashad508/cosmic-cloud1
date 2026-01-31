import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { 
  Shield, Plus, Trash2, LogOut, ArrowLeft, Loader2, 
  RefreshCw, CheckCircle, Clock, XCircle, Edit2, Save, X,
  Megaphone, MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";

interface AsnEntry {
  id: string;
  asn_number: string;
  user_name: string;
  status: string;
  comments: string | null;
  created_at: string;
  updated_at: string;
}

interface Announcement {
  id: string;
  message: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminPanel = () => {
  const [entries, setEntries] = useState<AsnEntry[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // New entry form
  const [newAsnNumber, setNewAsnNumber] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newStatus, setNewStatus] = useState("pending");
  const [newComments, setNewComments] = useState("");
  
  // Edit form
  const [editStatus, setEditStatus] = useState("");
  const [editComments, setEditComments] = useState("");
  
  // New announcement
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [addingAnnouncement, setAddingAnnouncement] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchEntries();
    fetchAnnouncements();
    
    // Set up realtime subscription
    const channel = supabase
      .channel("admin_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "asn_entries" }, () => {
        fetchEntries();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, () => {
        fetchAnnouncements();
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

  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const addEntry = async () => {
    if (!newAsnNumber.trim() || !newUserName.trim()) {
      toast.error("Please fill in all required fields");
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
          comments: newComments.trim() || null,
        });

      if (error) throw error;

      toast.success("Entry added successfully");
      setNewAsnNumber("");
      setNewUserName("");
      setNewStatus("pending");
      setNewComments("");
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
        .update({ 
          status: editStatus,
          comments: editComments.trim() || null,
        })
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

  const addAnnouncement = async () => {
    if (!newAnnouncement.trim()) {
      toast.error("Please enter an announcement message");
      return;
    }

    setAddingAnnouncement(true);
    try {
      const { error } = await supabase
        .from("announcements")
        .insert({ message: newAnnouncement.trim() });

      if (error) throw error;

      toast.success("Announcement added successfully");
      setNewAnnouncement("");
      fetchAnnouncements();
    } catch (error) {
      console.error("Error adding announcement:", error);
      toast.error("Failed to add announcement");
    } finally {
      setAddingAnnouncement(false);
    }
  };

  const toggleAnnouncement = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from("announcements")
        .update({ is_active: !currentActive })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Announcement ${!currentActive ? "activated" : "deactivated"}`);
      fetchAnnouncements();
    } catch (error) {
      console.error("Error toggling announcement:", error);
      toast.error("Failed to update announcement");
    }
  };

  const deleteAnnouncement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this announcement?")) return;

    try {
      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Announcement deleted");
      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
      toast.error("Failed to delete announcement");
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
              <span className="text-xs text-muted-foreground">Management Console</span>
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
          <Tabs defaultValue="asn" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="asn" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                ASN Entries
              </TabsTrigger>
              <TabsTrigger value="announcements" className="flex items-center gap-2">
                <Megaphone className="w-4 h-4" />
                Announcements
              </TabsTrigger>
            </TabsList>

            {/* ASN Entries Tab */}
            <TabsContent value="asn">
              {/* Add New Entry */}
              <div className="glass rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Add New ASN Entry
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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

                <div>
                  <Label htmlFor="comments" className="text-sm mb-2 block flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Comments (Optional)
                  </Label>
                  <Textarea
                    id="comments"
                    placeholder="Add any notes or reasons for this entry..."
                    value={newComments}
                    onChange={(e) => setNewComments(e.target.value)}
                    className="bg-background/50"
                    rows={2}
                  />
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
                  <div className="space-y-4">
                    {entries.map((entry) => (
                      <div key={entry.id} className="glass rounded-xl p-4 border border-border/50">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="text-sm text-muted-foreground">ASN Number</div>
                              <div className="font-mono font-semibold">{entry.asn_number}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">User Name</div>
                              <div className="font-semibold">{entry.user_name}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Status</div>
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
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Created</div>
                              <div className="text-sm">{new Date(entry.created_at).toLocaleDateString()}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
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
                                    setEditComments(entry.comments || "");
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
                        </div>
                        
                        {/* Comments Section */}
                        <div className="border-t border-border/50 pt-3 mt-3">
                          <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            Comments
                          </div>
                          {editingId === entry.id ? (
                            <Textarea
                              value={editComments}
                              onChange={(e) => setEditComments(e.target.value)}
                              placeholder="Add comments..."
                              className="bg-background/50"
                              rows={2}
                            />
                          ) : (
                            <div className="text-sm">
                              {entry.comments || <span className="text-muted-foreground italic">No comments</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements">
              {/* Add New Announcement */}
              <div className="glass rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-primary" />
                  Add New Announcement
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="announcement" className="text-sm mb-2 block">Announcement Message</Label>
                    <Textarea
                      id="announcement"
                      placeholder="Enter your announcement message that will appear at the top of the website..."
                      value={newAnnouncement}
                      onChange={(e) => setNewAnnouncement(e.target.value)}
                      className="bg-background/50"
                      rows={3}
                    />
                  </div>
                  
                  <Button onClick={addAnnouncement} disabled={addingAnnouncement}>
                    {addingAnnouncement ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Announcement
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Announcements List */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    Active Announcements ({announcements.filter(a => a.is_active).length})
                  </h2>
                  <Button variant="outline" size="sm" onClick={fetchAnnouncements}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                {announcements.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No announcements yet. Add your first announcement above.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {announcements.map((announcement) => (
                      <div 
                        key={announcement.id} 
                        className={`glass rounded-xl p-4 border ${announcement.is_active ? "border-primary/30" : "border-border/50 opacity-60"}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {announcement.is_active ? (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 font-medium">
                                  ACTIVE
                                </span>
                              ) : (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                                  INACTIVE
                                </span>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {new Date(announcement.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-foreground">{announcement.message}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleAnnouncement(announcement.id, announcement.is_active)}
                            >
                              {announcement.is_active ? "Deactivate" : "Activate"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteAnnouncement(announcement.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;