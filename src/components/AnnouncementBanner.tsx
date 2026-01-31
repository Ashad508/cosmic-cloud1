import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Megaphone, X } from "lucide-react";

interface Announcement {
  id: string;
  message: string;
}

const AnnouncementBanner = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetchAnnouncement();

    // Set up realtime subscription
    const channel = supabase
      .channel("announcements_public")
      .on("postgres_changes", { event: "*", schema: "public", table: "announcements" }, () => {
        fetchAnnouncement();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("id, message")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      setAnnouncement(data);
      setDismissed(false);
    } catch (error) {
      console.error("Error fetching announcement:", error);
    }
  };

  if (!announcement || dismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary via-accent to-primary text-white py-2 px-4">
      <div className="container mx-auto flex items-center justify-center gap-3 relative">
        <Megaphone className="w-4 h-4 flex-shrink-0 animate-pulse" />
        <p className="text-sm font-medium text-center pr-8">{announcement.message}</p>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;