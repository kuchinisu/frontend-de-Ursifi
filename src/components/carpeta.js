const CarpetaComponent = ({id,nombre}) => {
    return(
        <div>
            <div key={id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-center space-x-2">
                            <div className="bg-blue-500 text-white p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4V4z" />
                            </svg>
                        </div>
                    <span className="font-semibold">{nombre}</span>
                </div>
            </div>
        </div>
    );
};


export default CarpetaComponent