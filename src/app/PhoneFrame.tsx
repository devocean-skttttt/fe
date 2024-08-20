import "./globals.css";

function PhoneFrame({ children }: { readonly children: React.ReactNode }) {
    return (
        <div className="phone-frame">
            <div className="flex justify-center items-center h-full">
                <div className="h-[90%] overflow-y-auto">
                    {children}
                </div>
            </div>  
        </div>
    );
}

export default PhoneFrame;
