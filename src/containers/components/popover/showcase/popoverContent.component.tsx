import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten';
import {
  Button,
  Text,
  Avatar,
} from 'react-native-ui-kitten';
import { textStyle } from '@src/components/common';
import { Profile } from '@src/core/model';

interface ComponentProps {
  profile: Profile;
  onFollowPress: () => void;
}

export type PopoverContentProps = ThemedComponentProps & ViewProps & ComponentProps;

class PopoverContentComponent extends React.Component<PopoverContentProps> {

  private onFollowPress = () => {
    this.props.onFollowPress();
  };

  public render(): React.ReactNode {
    const {
      style,
      themedStyle,
      profile,
      ...restProps
    } = this.props;
    const name: string = `${profile.firstName} ${profile.lastName}`;

    return (
      <View
        style={[themedStyle.container, style]}
        {...restProps}>
        <View style={themedStyle.topContainer}>
          <Avatar
            style={themedStyle.avatar}
            source={profile.photo.imageSource}
          />
          <View>
            <Text
              category='s2'
              style={themedStyle.nameLabel}>
              {name}
            </Text>
            <Text
              appearance='hint'
              category='c1'>
              {profile.location}
            </Text>
          </View>
        </View>
        <Button
          style={themedStyle.button}
          appearance='outline'
          size='tiny'
          onPress={this.onFollowPress}>
          FOLLOW
        </Button>
      </View>
    );
  }
}

export const PopoverContent = withStyles(PopoverContentComponent, (theme: ThemeType) => ({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  nameLabel: {
    ...textStyle.subtitle,
  },
  button: {
    alignSelf: 'center',
  },
  avatar: {
    marginRight: 12,
  },
}));
