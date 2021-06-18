import React, { FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGifts } from '@fortawesome/free-solid-svg-icons'

import './App.component.css';
import PromoServiceRegister from './features/promo-service-register/PromoServiceRegister.component';
import HorizontalNav from './components/horizontal-nav/HorizontalNav.component';

import { AppLayoutProps } from './types/AppLayoutProps.type';
import { AppLayoutState } from './types/AppLayoutState.type';

/**
 * 
 */
class AppLayout extends React.Component<AppLayoutProps, AppLayoutState> {
    /**
     * 
     * @param props 
     */
    constructor(props: AppLayoutProps) {
        super(props);
    }

    /**
     * 
     * @param name 
     */
    _onKeyUp(name: string): void {
        this.setState({ name });
    }

    render(): JSX.Element {
        return (
            <React.Fragment>
                <HorizontalNav
                    signOutName="Sign Out"
                />
                <main className="container">
                    <div className="d-flex align-items-center p-3 my-3 text-white bg-purple rounded shadow-sm">
                        <div className="lh-1">
                            <FontAwesomeIcon icon={faGifts} />
                            <h1 className="h6 mb-0 text-white lh-1">{this.props?.title}</h1>
                            <small>{this.props.subTitle}</small>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="search" aria-label="Service Search"
                                onChange={(evt) => this._onKeyUp(evt.target.value)} />
                        </div>
                    </div>
                    <div className="my-3 p-3 bg-body rounded shadow-sm">
                        <h6 className="border-bottom pb-2 mb-\2">Promo Services</h6>
                        <PromoServiceRegister name={this.state?.name} />
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default AppLayout;