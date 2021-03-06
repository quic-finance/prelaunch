import React, { useCallback, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import QuicProvider from './contexts/QuicProvider'
import useModal from './hooks/useModal'
import theme from './theme'
import Farms from './views/Farms'
import PreLaunch from './views/PreLaunch'
import Admin from './views/Admin'

const url = new URL(window.location.toString())
if (url.searchParams.has('ref')) {
	document.querySelectorAll('a[href]').forEach((el) => {
		const attrUrl = new URL(el.getAttribute('href'))
		attrUrl.searchParams.set('ref', url.searchParams.get('ref'))
	})
}

const App: React.FC = () => {
	const [mobileMenu, setMobileMenu] = useState(false)

	const handleDismissMobileMenu = useCallback(() => {
		setMobileMenu(false)
	}, [setMobileMenu])

	const handlePresentMobileMenu = useCallback(() => {
		setMobileMenu(true)
	}, [setMobileMenu])

	return (
		<Providers>
			<Router>
				<TopBar onPresentMobileMenu={handlePresentMobileMenu} />
				<MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
				<Switch>
					<Route path="/" exact>
						<PreLaunch />
					</Route>
					<Route path="/farms">
						<Farms />
					</Route>
					<Route path="/admin">
						<Admin />
					</Route>
				</Switch>
			</Router>
		</Providers>
	)
}

const Providers: React.FC = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<UseWalletProvider
				chainId={4}
				connectors={{
					walletconnect: { rpcUrl: 'https://eth.aragon.network/' },
				}}
			>
				<QuicProvider>
					<TransactionProvider>
						<FarmsProvider>
							<ModalsProvider>{children}</ModalsProvider>
						</FarmsProvider>
					</TransactionProvider>
				</QuicProvider>
			</UseWalletProvider>
		</ThemeProvider>
	)
}

export default App
