import Editor from './editor'
import { NavBar } from './navbar';
import Toolbar from './toolbar';

interface DocumentPageProps {
    params: Promise<{ documentID: string }>;
}

const DocumentPage = async ({ params }: DocumentPageProps) => {
    const { documentID } =  await params;

    return (
        <div className='min-h-screen bg-[#FAFBFD]'>
            <div className='flex flex-col px-4 pt-2 gap-y-2 fixed tap-0 left-0 right-0 z-10 bg-[#FAFBFD]'>
                <NavBar />
                <Toolbar />
            </ div>
            <div className='pt-[114px] print:pt-0'>
                <Editor />
            </div>
        </div>
    );  
}

export default DocumentPage;
