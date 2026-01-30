-- Create ASN entries table for Hatch Trial Status tracking
CREATE TABLE public.asn_entries (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    asn_number TEXT NOT NULL UNIQUE,
    user_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.asn_entries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read ASN entries (for public status checker)
CREATE POLICY "Anyone can view ASN entries"
ON public.asn_entries
FOR SELECT
USING (true);

-- Only admins can insert ASN entries
CREATE POLICY "Admins can insert ASN entries"
ON public.asn_entries
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update ASN entries
CREATE POLICY "Admins can update ASN entries"
ON public.asn_entries
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete ASN entries
CREATE POLICY "Admins can delete ASN entries"
ON public.asn_entries
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_asn_entries_updated_at
BEFORE UPDATE ON public.asn_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();