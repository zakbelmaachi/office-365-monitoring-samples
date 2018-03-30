import React from 'react';
import './NavBar.css';

// not currently using NavBar - 
// links below are arbitrary and are taken from PnP Partner Pack
// recommended enhancement would be leveraging react router v4 and routing to different charts
const NavBar = (props) => (
    <div className="ms-NavBar">
        <div className="ms-NavBar-openMenu js-openMenu">
            <i className="ms-Icon ms-Icon--menu"></i>
        </div>
        <ul className="ms-NavBar-items">
            <li className="ms-NavBar-item"><a className="ms-NavBar-link" href="/Home/Index"><i className="ms-Icon ms-Icon--home"></i> Home</a></li>
            <li className="ms-NavBar-item"><a className="ms-NavBar-link" href="/Home/CreateSiteCollection"><i className="ms-Icon ms-Icon--onlineAdd"></i> Services</a></li>
            <li className="ms-NavBar-item"><a className="ms-NavBar-link" href="/Home/MyProvisionedSites"><i className="ms-Icon ms-Icon--listBullets"></i> Webhooks</a></li>
            <li className="ms-NavBar-item ms-NavBar-item--hasMenu">
                <a className="ms-NavBar-link"> Governance</a>
                {/* <i className="ms-NavBar-chevronDown ms-Icon ms-Icon--chevronDown" aria-hidden="true"></i> */}
                <ul className="ms-ContextualMenu">
                    <li className="ms-ContextualMenu-item">
                        <a className="ms-ContextualMenu-link" href="/Governance/Branding">SharePoint Branding</a>
                    </li>
                    <li className="ms-ContextualMenu-item">
                        <a className="ms-ContextualMenu-link" href="/Governance/RefreshSites">Refresh Sites</a>
                    </li>
                    <li className="ms-ContextualMenu-item">
                        <a className="ms-ContextualMenu-link" href="/Governance/SiteCollectionsBatch">Site Collections Batch</a>
                    </li>
                </ul>
            </li>
            <li className="ms-NavBar-item ms-NavBar-item--right"><a className="ms-NavBar-link" onClick={props.handleClick} href=""><i className="ms-Icon ms-Icon--gear"></i> Sign Out</a></li>
        </ul>
    </div>
)


export default NavBar;