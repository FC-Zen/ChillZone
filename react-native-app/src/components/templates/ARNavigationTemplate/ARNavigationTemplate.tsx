import { View, Text } from "react-native";
import React from "react";
import { styles } from "./style";
import { PageHeader, Button } from "@components";
import { colors } from "@theme";
import YoutubePlayer from "react-native-youtube-iframe";

export type ARNavigationTemplateProps = {
    title: string;
    infoMessage: string;
    videoTitle: string;
    redirectionMessage: string;
    onRedirection: () => void;
};

export const ARNavigationTemplate: React.FC<ARNavigationTemplateProps> = ({
    title,
    redirectionMessage,
    infoMessage,
    videoTitle,
    onRedirection,
}) => {
    return (
        <View style={styles.container}>
            <PageHeader title={title} variant="back" icon={{ name: 'BackArrow', color: colors.black, width: 16, height: 16 }}/>
            <View style={styles.content}>
                <Text style={styles.infoMessage}>{infoMessage}</Text>
                <View style={styles.videoContainer}>
                    <Text style={styles.videoTitle}>{videoTitle}</Text>
                    <View style={styles.videos}>
                        <View style={styles.video}>
                            <YoutubePlayer 
                                height={180} 
                                videoId={"WLkbNlC2_y0"} 
                            />
                        </View>
                        <View style={styles.video}>
                            <YoutubePlayer 
                                height={180} 
                                videoId={"e3OupacTPDE"}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.redirectContainer}>
                <Text style={styles.redirectMessage} >{redirectionMessage}</Text>
                <Button 
                    title="Github" 
                    variant='icon' 
                    onPress={onRedirection} 
                    icon={
                        {
                            name: 'Github',
                            width: 25,
                            height: 25,
                        }
                    }
                    textStyle={styles.redirectButtonText}
                    style={styles.redirectButton}
                />
            </View>
        </View>
    );
};