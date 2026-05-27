// Function for handling error
export const handlError = <Type extends (...arg: any[]) => any>(fn: Type) => {

    return async function (...args: Parameters<Type>){
        try {
            
            return await fn(...args)
    
        } catch (error: any) {
            console.error(error)
            return {success: false, error: error?.response?.data?.error || "Something went wrong"}
        }
    }

}