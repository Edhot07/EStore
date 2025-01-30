import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { BackInStockNotificationRequestValues, createBackInStockNotificationRequest } from "@/wix-api/backInStockNotifications";
import { wixBroserClient } from "@/lib/wix-client.browser";

export function useCreateBackInStockNotificationRequest(){
    const {toast} = useToast();

    return useMutation({
        mutationFn: (values: BackInStockNotificationRequestValues)=>
            
            createBackInStockNotificationRequest(wixBroserClient, values),
        
        onError(error){
            console.error(error, "This is the error");
            if(
                (error as any).details.applicationError.code === "BACK_IN_STOCK_NOTIFICATION_REQUEST_ALREADY_EXISTS"
            ) {
                
                toast({
                    variant: "destructive",
                    description: "You've already requested a back in stock notification for this product.",
                });
            } else {
                toast({
                    variant: "destructive",
                    description: "Something went wrong. Please try again.",
                })
            }
        },
    
    })
}