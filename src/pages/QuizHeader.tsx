import logo from "../assets/react.svg"

export function QuizHeader() {
    return (
        <header className="border-b py-4 px-6 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <img src={logo} alt="" />
                <h1 className="text-lg font-medium">Succeedex Placement Portal</h1>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                    <div>
                        <p className="text-sm font-medium">Prithviraj</p>
                        <p className="text-sm font-medium">Registration No.</p>
                        <p className="text-xs">B.E CSE</p>
                    </div>
                </div>
            </div>
        </header>
    )
}
