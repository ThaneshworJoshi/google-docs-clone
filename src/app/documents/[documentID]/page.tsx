import Editor from './editor'

interface DocumentPageProps {
    params: Promise<{ documentID: string }>;
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
    const { documentID } =  await params;
    
    console.log(documentID)
    return (
        <div className='min-h-screen bg-[#FAFBFD]'>
            <Editor />
        </div>
    );  
}

export default DocumentPage;
