import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

interface NotificationProps {
  title: string;
  description: string;
  variant: "default" | "destructive";
  duration?: number;
}

export const Notification: React.FC<NotificationProps> = (props) => {
  const { description, duration, title, variant } = props;
  const { toast } = useToast();
  useEffect(() => {
    toast({
      title,
      description,
      variant,
      duration,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, props]);
  return <Toaster />;
};
