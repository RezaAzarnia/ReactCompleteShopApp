import './TabpaneButton.scss'
const TabpaneButton = ({ icon, title, onClick, active }) => {
    return (
        <div className={`tabpane-button ${active ? "active" : ''}`} onClick={onClick}>
            <div className="tabpane-body">
                <div className="tabpane-icon">
                    {icon}
                </div>
                <div className="tabpane-title">
                    <span>{title}</span>
                </div>
            </div>
        </div >
    )
}
export default TabpaneButton
