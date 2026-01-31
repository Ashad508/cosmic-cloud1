import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Search, CheckCircle, XCircle, Clock, ArrowLeft, Loader2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import cosmicLogo from "@/assets/cosmic-cloud-logo-new.jpeg";

interface AsnEntry {
  asn_number: string;
  user_name: string;
  status: string;
  comments: string | null;
  created_at: string;
  updated_at: string;
}

const StatusChecker = () => {
  const [asnNumber, setAsnNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AsnEntry | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);

  const checkStatus = async () => {
    if (!asnNumber.trim() || !userName.trim()) return;
    
    setLoading(true);
    setNotFound(false);
    setResult(null);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from("asn_entries")
        .select("*")
        .eq("asn_number", asnNumber.trim())
        .eq("user_name", userName.trim())
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setResult(data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error checking status:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "active":
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case "pending":
      case "processing":
        return <Clock className="w-8 h-8 text-yellow-500" />;
      case "rejected":
      case "expired":
        return <XCircle className="w-8 h-8 text-red-500" />;
      default:
        return <Clock className="w-8 h-8 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "active":
        return "text-green-500 bg-green-500/10 border-green-500/30";
      case "pending":
      case "processing":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
      case "rejected":
      case "expired":
        return "text-red-500 bg-red-500/10 border-red-500/30";
      default:
        return "text-muted-foreground bg-muted/10 border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={cosmicLogo} alt="Slayer Nodes" className="w-10 h-10 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-gradient">Slayer Nodes</h1>
              <span className="text-xs text-muted-foreground">Trial Status Checker</span>
            </div>
          </Link>

          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Hatch Trial Status</h1>
            <p className="text-muted-foreground">
              Check the status of your ASN trial by entering your details below
            </p>
          </div>

          <div className="glass rounded-2xl p-8 mb-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="asnNumber" className="text-sm font-medium mb-2 block">
                  ASN Number
                </Label>
                <Input
                  id="asnNumber"
                  placeholder="Enter your ASN number"
                  value={asnNumber}
                  onChange={(e) => setAsnNumber(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <div>
                <Label htmlFor="userName" className="text-sm font-medium mb-2 block">
                  User Name
                </Label>
                <Input
                  id="userName"
                  placeholder="Enter your username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-background/50"
                />
              </div>

              <Button 
                onClick={checkStatus} 
                className="w-full" 
                size="lg"
                disabled={loading || !asnNumber.trim() || !userName.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Check Status
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Results */}
          {searched && (
            <div className="animate-fade-in">
              {result ? (
                <div className="glass rounded-2xl p-8 text-center">
                  <div className="mb-4">
                    {getStatusIcon(result.status)}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">ASN Found</h2>
                  
                  <div className="space-y-4 mt-6">
                    <div className="glass rounded-xl p-4">
                      <div className="text-sm text-muted-foreground mb-1">ASN Number</div>
                      <div className="font-mono font-semibold">{result.asn_number}</div>
                    </div>
                    
                    <div className="glass rounded-xl p-4">
                      <div className="text-sm text-muted-foreground mb-1">User Name</div>
                      <div className="font-semibold">{result.user_name}</div>
                    </div>
                    
                    <div className="glass rounded-xl p-4">
                      <div className="text-sm text-muted-foreground mb-1">Status</div>
                      <div className={`inline-flex px-4 py-2 rounded-full border font-semibold ${getStatusColor(result.status)}`}>
                        {result.status.toUpperCase()}
                      </div>
                    </div>
                    
                    {result.comments && (
                      <div className="glass rounded-xl p-4 text-left border border-primary/20">
                        <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-primary" />
                          Admin Comments
                        </div>
                        <div className="text-sm bg-card/50 rounded-lg p-3 whitespace-pre-wrap">
                          {result.comments}
                        </div>
                      </div>
                    )}
                    
                    <div className="glass rounded-xl p-4">
                      <div className="text-sm text-muted-foreground mb-1">Last Updated</div>
                      <div className="text-sm">{new Date(result.updated_at).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ) : notFound ? (
                <div className="glass rounded-2xl p-8 text-center border-destructive/30">
                  <XCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Not Found</h2>
                  <p className="text-muted-foreground">
                    Your ASN number is not available in our system. Please contact support if you believe this is an error.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-6"
                    onClick={() => window.open("https://discord.gg/gTAVRXeFVa", "_blank")}
                  >
                    Contact Support
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StatusChecker;