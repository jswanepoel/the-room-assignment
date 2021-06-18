import React from 'react';
import { Link } from 'react-router-dom';

import './HorizontalNav.component.css';
import { IHorizontalNavState } from './models/HorizontalNavState.interface';
import { IHorizontalNavProps } from './models/HorizontalNavProps.interface';

class HorizontalNav extends React.Component<IHorizontalNavProps, IHorizontalNavState> {
    /**
     *
     */
    constructor(props: IHorizontalNavProps) {
        super(props);
    }

    render(): JSX.Element {
        return (
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"></a>
                    <div className="col-md-3 text-end">
                        <Link to={'/signin'}>
                            <button type="button" className="btn btn-primary">
                                {this.props.signOutName}
                            </button>
                        </Link>
                    </div>
                </header>
            </div>
        )
    }
}

export default HorizontalNav;