import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

const DrawerLeft = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
DrawerLeft.displayName = "DrawerLeft";

const DrawerLeftTrigger = DrawerPrimitive.Trigger;

const DrawerLeftPortal = DrawerPrimitive.Portal;

const DrawerLeftClose = DrawerPrimitive.Close;
const DrawerLeftOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 bg-black/40", className)} {...props} />
));
DrawerLeftOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerLeftContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerLeftPortal>
    <DrawerLeftOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn("bg-white flex flex-col h-full  mt-24 fixed bottom-0 left-0")}
      {...props}
    >
      <div className="p-8 flex flex-col h-full">{children}</div>
    </DrawerPrimitive.Content>
  </DrawerLeftPortal>
));
DrawerLeftContent.displayName = "DrawerLeftContent";
const DrawerLeftHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerLeftHeader.displayName = "DrawerLeftHeader";
const DrawerLeftFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-auto flex flex-col", className)} {...props} />
);
DrawerLeftFooter.displayName = "DrawerLeftFooter";
const DrawerLeftTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg text-zinc-900 font-semibold leading-none tracking-tigh flex flex-col items-start",
      className
    )}
    {...props}
  />
));
DrawerLeftTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerLeftDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerLeftDescription.displayName = DrawerPrimitive.Description.displayName;
export {
  DrawerLeft,
  DrawerLeftPortal,
  DrawerLeftOverlay,
  DrawerLeftTrigger,
  DrawerLeftClose,
  DrawerLeftContent,
  DrawerLeftHeader,
  DrawerLeftFooter,
  DrawerLeftTitle,
  DrawerLeftDescription,
};
