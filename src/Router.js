import React from 'react';
import { StyleSheet } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import Menu from './components/common/Menu';
import ReportDead from './components/common/ReportDead';
import ViewReports from './components/common/ViewReports';
import EditReports from './components/common/EditReports';
import EditReportsForm from './components/common/EditReportsForm';
import EmailSubForm from './components/common/EmailSubForm';
import Register from './components/common/Register';
import ViewReportDetails from './components/common/ViewReportDetails';

const RouterComponent = () => {
	return (
		<Router navigationBarStyle={styles.navBar}
						titleStyle={styles.navTitle}
						navBarButtonColor={'white'}>
			<Scene key="root">
				<Scene
					key="mainmenu"
					component={Menu}
					title="Roadkill 911"
					initial />
				<Scene
					key="reportDead"
					component={ReportDead}
					title="Submit New Report" />
				<Scene
					key="viewReports"
					component={ViewReports}
					title="View Local Reports" />
				<Scene
					key="editReports"
					component={EditReports}
					title="Submitted Reports" />
				<Scene
					key="emailSubForm"
					component={EmailSubForm}
					title="Submit New Report" />
				<Scene
					key="register"
					component={Register}
					title="Animal Control Group Registration" />
				<Scene
					key="editReportsForm"
					component={EditReportsForm}
					title="Modify Report"/>
				<Scene
					key="viewReportDetails"
					component={ViewReportDetails}
					title="View Report Details"/>
			</Scene>
		</Router>
	);
};

const styles = StyleSheet.create({
	navBar: {
		justifyContent: 'center',
		backgroundColor: '#101011',
		paddingTop: 15,
	},
	navTitle: {
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white',
		paddingTop: 0,
	}
})

export default RouterComponent;
