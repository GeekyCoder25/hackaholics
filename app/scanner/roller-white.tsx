const RollerAnimation: React.FC<{ h: string }> = ({ h }) => {
    return (
        <div>
            <div className={`flex items-center justify-center w-full ${h} max-h-full`}>
                <div className="animate-spin rounded-full h-full aspect-square border-4 border-white border-l-transparent"></div>
            </div>
        </div>

    );
};

export default RollerAnimation;