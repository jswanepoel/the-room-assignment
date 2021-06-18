import React from 'react';

import './PromoServiceRegister.component.css';
import PromoService from '../../components/promo-service/PromoService.component';
import { PromoServiceRegisterProps } from './types/PromoServiceRegisterProps.type';
import { PromoServiceRegisterState } from './types/PromoServiceRegisterState.type';
import apiService from './services/PromoService.api';
import InfiniteScroll from 'react-infinite-scroll-component';
import { IPromoService } from '../../components/promo-service/models/PromoService.interface';
import { IToken } from '../signin/models/token.interface';
import config from '../../../config/config.json';
import { IPromoServicePage } from '../../components/promo-service/models/PromoServicePage.interface';

/**
 * 
 */
class PromoServiceRegister extends React.Component<PromoServiceRegisterProps, PromoServiceRegisterState> {
    state: PromoServiceRegisterState;
    /**
     * 
     * @param props 
     */
    constructor(props: PromoServiceRegisterProps) {
        super(props);
        this.state = {
            promoServices: [],
            promoServiceMeta: {
                currentPage: 0,
                itemCount: 0,
                itemsPerPage: 0,
                totalItems: 0,
                totalPages: 0
            },
            nextPage: 0,
            hasMore: true,
        }
        this.getPromoServices = this.getPromoServices.bind(this);
        this.promoServices = this.promoServices.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
    }

    /**
     * 
     */
    componentDidMount(): void {
        console.log('componentDidMount');
        this.getPromoServices('');
    }

    /**
     * 
     * @param prevProps 
     * @param prevState 
     */
    componentDidUpdate(prevProps: PromoServiceRegisterProps): void {
        if (this.props.name !== prevProps.name) {
            this.setState({
                promoServices: [],
                promoServiceMeta: {
                    currentPage: 0,
                    itemCount: 0,
                    itemsPerPage: 0,
                    totalItems: 0,
                    totalPages: 0,
                },
                nextPage: 0,
                hasMore: true
            });
            this.getPromoServices(this.props.name || '');
        }
    }

    /**
     * 
     * @param services 
     * @returns 
     */
    promoServices(services: IPromoService[]): JSX.Element {
        const serviceItems = services.map((service) =>
            <PromoService key={`${service.id}${service.promoCode}`}
                id={service.id}
                name={service.name}
                description={service.description}
                promoCode={service.promoCode}
                bonus={service.bonus}
            />
        )

        return (
            <React.Fragment>
                {serviceItems}
            </React.Fragment>
        )
    }

    /**
     * 
     * @param name 
     */
    async getPromoServices(serviceName: string): Promise<void> {
        const token: IToken = JSON.parse(localStorage.getItem('token') || '{}');
        this.setState((state) => {
            return {
                nextPage: state.nextPage + 1
            }
        });
        const page = this.state?.nextPage;
        const pageSize = config.PAGE_SIZE;
        const name = serviceName;
        const username = token.username;
        const response = await apiService
            .post(`/${config.API_END_POINTS.PROMOS}`, {
                username,
                name,
                page,
                pageSize
            });

        const promoServicePage: IPromoServicePage = response.data;
        this.setState((state) => {
            return {
                promoServices: [...state.promoServices, ...promoServicePage.promoServices],
                promoServiceMeta: state.promoServiceMeta || promoServicePage.promoServiceMeta,
                hasMore: !(state.promoServiceMeta?.totalItems !== state.promoServices.length)
            }
        });
    }

    /**
     * 
     * @returns 
     */
    fetchMoreData(): void {
        this.getPromoServices(this.props.name || '');
    }

    render(): JSX.Element {
        return (
            <div
                id="scrollableDiv"
                style={{
                    height: 700,
                    overflow: 'auto',
                    display: 'flex',
                }}
            >
                <InfiniteScroll
                    dataLength={this.state.promoServices.length}
                    next={this.fetchMoreData}
                    hasMore={this.state?.hasMore}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget="scrollableDiv"
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }>
                    {this.state?.promoServices ? this.promoServices(this.state?.promoServices) : []}
                </InfiniteScroll>
            </div>
        )
    }
}

export default PromoServiceRegister;