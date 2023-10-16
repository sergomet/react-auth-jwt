import { Outlet } from 'react-router-dom'

export const Layout = () => {
    return (
        <div>
            <div id="preloader">
                <div id="status">
                    <div className="spinner-chase">
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                        <div className="chase-dot" />
                    </div>
                </div>
            </div>

            <div id="layout-wrapper">
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}