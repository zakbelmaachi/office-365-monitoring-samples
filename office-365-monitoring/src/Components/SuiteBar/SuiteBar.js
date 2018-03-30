import React, { Component } from 'react';
import Persona from '../Persona/Persona';
import './SuiteBar.css';

const SuiteBar = (props) => {
    return(
        <div id="suiteBarTop" className="ms-fullWidth removeFocusOutline" style={{height: '50px', position: 'relative'}}>
            <div className="o365cs-nav-header16 o365cs-base o365cst o365spo o365cs-nav-header o365cs-topnavBGColor-2 o365cs-topnavBGImage o365cs-rsp-off" id="O365_NavHeader">
                <div className="o365cs-nav-leftAlign">
                    <div className="o365cs-nav-topItem o365cs-rsp-m-hide o365cs-rsp-tn-hideIfAffordanceOn" style={{display: 'none'}}></div>
                    <div className="o365cs-nav-topItem o365cs-rsp-m-hide o365cs-rsp-tw-hide o365cs-rsp-tn-hideIfAffordanceOff" style={{display: 'none'}}></div>
                    <div className="o365cs-nav-topItem ms-fcl-w o365cs-rsp-tn-hideIfAffordanceOn" style={{display: 'none'}}></div>
                    <div className="o365cs-nav-topItem o365cs-nav-o365Branding o365cs-rsp-tn-hideIfAffordanceOn">
                        <a className="o365cs-nav-bposLogo o365cs-topnavText o365cs-o365logo o365cs-rsp-tw-hide o365cs-rsp-tn-hide o365button" role="link" id="O365_MainLink_Logo" href="https://portal.office.com/Home" aria-label="Go to your Office 365 home page"><span className="o365cs-nav-brandingText">Office 365</span><span className="wf wf-family-o365 wf-o365-x36 o365cs-nav-gallatinLogo"></span></a>
                        <div className="o365cs-nav-appTitleLine o365cs-nav-brandingText o365cs-topnavText o365cs-rsp-tw-hide o365cs-rsp-tn-hide"></div>
                        <a className="o365cs-nav-appTitle o365cs-topnavText o365button" role="link" href="/Home/Index" aria-label="Go to team sites"><span className="o365cs-nav-brandingText">Service Monitoring</span></a>
                        <div className="o365cs-nav-topItem o365cs-breadCrumbContainer o365cs-rsp-tw-hide o365cs-rsp-tn-hide" style={{display: 'none'}}></div>
                    </div>
                    <div className="o365cs-nav-centerAlign">
                        <div className="o365cs-rsp-tw-hide o365cs-rsp-tn-hide" style={{display: 'none'}}></div>
                        <div className="o365cs-rsp-tw-hide o365cs-rsp-tn-hide" style={{display: 'none'}}></div>
                    </div>
                    <div className="o365cs-nav-rightAlign o365cs-topnavLinkBackground-2" id="O365_TopMenu">
                        <div>
                            <div className="o365cs-nav-headerRegion"></div>
                        </div>
                    </div>
                </div>
                <div className="o365cs-nav-centerAlign">
                    <div className="o365cs-rsp-tw-hide o365cs-rsp-tn-hide" style={{display: 'none'}}></div>
                    <div className="o365cs-rsp-tw-hide o365cs-rsp-tn-hide" style={{display: 'none'}}></div>
                </div>
                <div className="o365cs-nav-rightAlign o365cs-topnavLinkBackground-2" id="O365_TopMenu">
                    <div>
                        <div className="o365cs-nav-rightMenus">
                            <div role="banner" aria-label="User settings">
                                <div className="o365cs-nav-topItem o365cs-rsp-tn-hideIfAffordanceOn">
                                    <div className="ms-Persona ms-Persona--s">
                                        <div className="ms-Persona-imageArea">

                                            {/* Persona Here */}
                                            <Persona />

                                        </div>
                                        <div className="ms-Persona--offline"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuiteBar;