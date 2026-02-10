
-- Create order_entries table
CREATE TABLE public.order_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  syn_number TEXT NOT NULL,
  user_name TEXT NOT NULL,
  service_name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  expected_time TEXT,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.order_entries ENABLE ROW LEVEL SECURITY;

-- Anyone can view order entries (for public lookup)
CREATE POLICY "Anyone can view order entries"
  ON public.order_entries FOR SELECT
  USING (true);

-- Only admins can insert
CREATE POLICY "Admins can insert order entries"
  ON public.order_entries FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update
CREATE POLICY "Admins can update order entries"
  ON public.order_entries FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete
CREATE POLICY "Admins can delete order entries"
  ON public.order_entries FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_order_entries_updated_at
  BEFORE UPDATE ON public.order_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
