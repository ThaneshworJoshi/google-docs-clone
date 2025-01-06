interface DocumentLayoutProps {
    children: React.ReactNode
}

const documentLayout = ({children}: DocumentLayoutProps) => {
    return (
        <div>
        {children}
        </div>
    );
    }   
export default documentLayout;  