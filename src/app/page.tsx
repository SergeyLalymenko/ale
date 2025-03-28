import CandidateForm from '@/components/CandidateForm';

function Home() {
    return (
        <div className="flex flex-col items-center container mx-auto px-4 py-5">
            <div className="w-full max-w-96">
                <CandidateForm />
            </div>
        </div>
    )
}

export default Home;
