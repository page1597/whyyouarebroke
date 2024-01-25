import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

const DrawerRight = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
DrawerRight.displayName = "DrawerRight";

const DrawerRightTrigger = DrawerPrimitive.Trigger;

const DrawerRightPortal = DrawerPrimitive.Portal;

const DrawerRightClose = DrawerPrimitive.Close;
const DrawerRightOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 bg-black/40", className)} {...props} />
));
DrawerRightOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerRightContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerRightPortal>
    <DrawerRightOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "bg-white flex flex-col h-full w-[300px] mt-24 fixed bottom-0 right-0"
        // "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        // className
      )}
      {...props}
    >
      {/* <div className="p-4 bg-white flex-1 h-full" /> */}
      {children}
    </DrawerPrimitive.Content>
  </DrawerRightPortal>
));
DrawerRightContent.displayName = "DrawerRightContent";
const DrawerRightHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerRightHeader.displayName = "DrawerRightHeader";
const DrawerRightFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerRightFooter.displayName = "DrawerRightFooter";
const DrawerRightTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DrawerRightTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerRightDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DrawerRightDescription.displayName = DrawerPrimitive.Description.displayName;
export {
  DrawerRight,
  DrawerRightPortal,
  DrawerRightOverlay,
  DrawerRightTrigger,
  DrawerRightClose,
  DrawerRightContent,
  DrawerRightHeader,
  DrawerRightFooter,
  DrawerRightTitle,
  DrawerRightDescription,
};

// export function DrawerRight() {
//   return (
//     <Drawer.Root direction="right">
//       <Drawer.Trigger asChild>
//         <button>Open Drawer</button>
//       </Drawer.Trigger>
//       <Drawer.Portal>
//         <Drawer.Overlay className="fixed inset-0 bg-black/40" />
//         <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
//           <div className="p-4 bg-white flex-1 h-full">
//             <div className="max-w-md mx-auto">
//               <Drawer.Title className="font-medium mb-4">Unstyled drawer for React.</Drawer.Title>
//               <p className="text-zinc-600 mb-2">
//                 This component can be used as a replacement for a Dialog on mobile and tablet devices.
//               </p>
//               <p className="text-zinc-600 mb-8">
//                 It uses{" "}
//                 <a
//                   href="https://www.radix-ui.com/docs/primitives/components/dialog"
//                   className="underline"
//                   target="_blank"
//                 >
//                   Radix&rsquo;s Dialog primitive
//                 </a>{" "}
//                 under the hood and is inspired by{" "}
//               </p>
//             </div>
//           </div>
//         </Drawer.Content>
//       </Drawer.Portal>
//     </Drawer.Root>
//   );
// }
