import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import styled from 'styled-components/native'
import { Divider } from 'react-native-paper';

import { Feather } from "@expo/vector-icons";
import { SubHeader, Normal, Small } from '../components/patterns/Texts';

import Colours from '../components/patterns/Colours'

import ReasonsIcon from "../components/ReasonIcon";

export default class SpecificDayScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mood: {},
			editable: false,
			note: ""
		};
		this.editReasons = this.editReasons.bind(this);
		this.removeReason = this.removeReason.bind(this);
	}

	editReasons() {
		this.props.navigation.push("Reasons", {
			moodId: this.state.mood_id,
			viewOnly: false,
			edit: true,
			selected: this.state.reasons,
			reasonsCallback: this.updateReasons
		});
	}

	updateReasons() {
		this.toggleEdit();
		this.renderReasons(true);
	}

	toggleEdit() {
		this.setState({ editable: !this.state.editable });
	}

	removeReason = reasonId => {
		this.state.reasons.filter(function (reason) {
			if (reason.reason_id == reasonId) {
				reason.selected = false;
			}
		});
	};

	render() {
		const { navigation } = this.props;
		let addButton;
		let editButton = (
			<TouchableOpacity onPress={this.toggleEdit} style={{ width: "15%" }}>
				<Feather
					name="edit"
					size={28}
					color="#1B4751"
					style={{ textAlign: "right", paddingRight: 10 }}
				/>
			</TouchableOpacity>
		);

		if (this.state.editable) {
			addButton = (
				<AddButton animation="fadeIn">
					<TouchableOpacity onPress={this.editReasons}>
						<Feather name="plus-circle" size={36} color="#1B4751" />
					</TouchableOpacity>
				</AddButton>
			);
		}

		return (
			<View style={{ flex: 1, backgroundColor: Colours.purple() }}>
				<ScrollView>
					<SubHeader lightColour center bold>
						You were feeling
            <SubHeader bold style={{ color: 'green' }}>
							{" "}{"great"}{" "}
						</SubHeader>
						<SubHeader lightColour bold>
							on {"\n"}
							{"Wednesday 16th May"}.
            </SubHeader>
					</SubHeader>

					<Reasons>
						{this.props.route.params.entry.reasons.map((reason, key) => (
							<ReasonsIcon
								reason={reason.name}
								reasonId={reason.id}
								reasonCallback={this.removeReason}
								viewOnly={true}
								editable={this.state.editable}
								position={key}
								buttonCallback={this.renderNoteSection}
								key={key}
							/>
						))}
						{addButton}
					</Reasons>

					<View>
						<Normal lightColour bold>Notes:</Normal>
						<Small lightColour numberOfLines={10}>{this.props.route.params.entry.notes}</Small>
					</View>


				</ScrollView>
			</View>
		);
	}
}

const Reasons = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 10px;
  padding-right: 10px;
`;

const AddButton = styled.View`
  display: flex;
  width: 33%;
  padding-top: 25px;
  padding-bottom: 25px;
  align-items: center;
`;
