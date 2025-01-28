import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { colors, typography } from '@theme';
import { FormattedCommand } from '@services';
import { IconWithText } from '../IconWithText';
import { useTranslation } from 'react-i18next';

type CommandOverlayProps = {
  data: FormattedCommand;
};

export const CommandOverlay: React.FC<CommandOverlayProps> = ({
  data,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [QRcodePath, setQRcodePath] = useState<string | null>(null);
  const { t } = useTranslation();

  const toggleOverlay = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setQRcodePath(data.qrcode_link.replace("~/","@/"))
  },[])

  console.log("QRcodePath : ", QRcodePath)

  return (
    <TouchableOpacity onPress={toggleOverlay} style={styles.container}>
      <View style={[styles.overlayBox, isExpanded && styles.expandedContainer]}>
        {!isExpanded && (
          <View style={styles.headerRow}>
            <IconWithText
              icon="Cube"
              variant="horizontal"
              text={`N°${data.command_id.toString()}`}
              iconColor={colors.resolutionBlue}
              iconWidth={16}
              iconHeight={16}
              textStyle={{ fontSize: 14, fontFamily: typography.h3.fontFamily }}
              textColor={colors.resolutionBlue}
              style={styles.previewText}
            />
            <View style={styles.rightColumn}>
              <IconWithText
                icon="Calendar"
                variant="horizontal"
                text={data.creation_date}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textStyle={{
                  fontSize: 14,
                  fontFamily: typography.h3.fontFamily,
                }}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />
              <IconWithText
                icon="Clock"
                variant="horizontal"
                text={`${data.pickup_time}-${data.final_pickup_time}`}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textStyle={{
                  fontSize: 14,
                  fontFamily: typography.h3.fontFamily,
                }}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />
            </View>
          </View>
        )}

        {/* ------------------------------------------- Expanded ------------------------------------------ */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.titleText}>{t("recap.commandTitle")}</Text>
            <IconWithText
              icon="Cube"
              variant="horizontal"
              text={`N°${data.command_id.toString()}`}
              iconColor={colors.resolutionBlue}
              iconWidth={16}
              iconHeight={16}
              textColor={colors.resolutionBlue}
              style={styles.previewText}
            />

            {QRcodePath && <Image source={require('@/assets/data/Images_test/qrcode.png')} style={styles.image} />}

            <View style={styles.detailsContainer}>
              <IconWithText
                icon="Calendar"
                variant="horizontal"
                text={data.creation_date}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />
              <IconWithText
                icon="Clock"
                variant="horizontal"
                text={`${data.pickup_time}-${data.final_pickup_time}`}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />
              <IconWithText
                icon="Marker"
                variant="horizontal"
                text={data.restauration_place_name}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />

              <IconWithText
                icon="Money"
                variant="horizontal"
                text={`${data.total_amount.toString()} €`}
                iconColor={colors.resolutionBlue}
                iconWidth={16}
                iconHeight={16}
                textColor={colors.resolutionBlue}
                style={styles.previewText}
              />
            </View>

          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
