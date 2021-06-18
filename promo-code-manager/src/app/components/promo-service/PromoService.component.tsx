import React, { MouseEventHandler, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

import './PromoService.component.css';
import { PromoServiceProps } from './models/PromoServiceProps.interface';
import { IToken } from '../../features/signin/models/token.interface';
import apiService from '../../features/promo-service-register/services/PromoService.api';
import { IActiveBonusResponse } from './models/ActiveBonusResponse.interface';
import config from '../../../config/config.json';

function PromoService(props: PromoServiceProps): JSX.Element {
    const [isCopied, setIsCopied] = useState(false);
    const [isActiveBonus, setIsActiveBonus] = useState(false);
    const onCopyText = () => {
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    const activateBonus = (_evt: any, id: string) => {
        const token: IToken = JSON.parse(localStorage.getItem('token') || '{}');
        console.log(`id: ${id}, username: ${token.username}`);
        apiService
            .put(`${config.SERVER_URL}/${config.API_END_POINTS.PROMOS}`, {
                username: token.username,
                id: id
            })
            .then(response => {
                console.log(response);
                const activateBonus: IActiveBonusResponse = response.data;
                setIsActiveBonus(activateBonus.success);
            })
            .catch((reason) => console.log(reason));
    }

    return (
        <div className="card w-100 shadow mb-4 border-0">
            <div className="card-body">
                <div className="row">
                    <div className="col-4">
                        <h2 className="h3 mb-3 fw-normal">{props.name}</h2>
                        <small>{props.description}</small>
                    </div>
                    <div className="col-8">
                        <div className="row g-3">
                            <div className="col">
                                <label htmlFor="promoCode" className="form-label">PROMOCODE</label>
                                {isCopied ? <span style={{ color: 'red' }}>  Copied</span> : null}
                                <div className="input-group">
                                    <input id={props.id} type="text" className="form-control" aria-label="PROMOCODE" defaultValue={props.promoCode} />
                                    <CopyToClipboard text={props.promoCode} onCopy={onCopyText}>
                                        <div>
                                            <a className="btn input-group-text">
                                                <FontAwesomeIcon icon={faCopy} />
                                            </a>
                                        </div>
                                    </CopyToClipboard>
                                </div>
                            </div>
                            <div className="col d-flex align-content-end flex-wrap">
                                <button disabled={isActiveBonus || !!props.bonus} className="btn btn-primary w-100" onClick={(evt) => activateBonus(evt, props.id)}>{isActiveBonus || !!props.bonus ? 'Active' : 'Activate Bonus'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromoService;