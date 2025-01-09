import Editor from './editor'
import Toolbar from './toolbar';

interface DocumentPageProps {
    params: Promise<{ documentID: string }>;
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
    const { documentID } =  await params;
    
    console.log(documentID)
    return (
        <div className='min-h-screen bg-[#FAFBFD]'>
            <Toolbar />
            <Editor />
        </div>
    );  
}

export default DocumentPage;
