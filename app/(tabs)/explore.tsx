import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1495020689067-958852a7765e' }}
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>

      <ThemedText style={{ fontFamily: Fonts.rounded, marginBottom: 20 }}>
        Discover the stories, trends, and topics shaping the world today.
      </ThemedText>

      <Collapsible title="Popular topics">
        <ThemedText>Technology</ThemedText>
        <ThemedText>Business</ThemedText>
        <ThemedText>Culture</ThemedText>
      </Collapsible>

      <ThemedView style={{ gap: 12, marginTop: 20 }}>
        <ExternalLink href="https://docs.expo.dev/">
          <ThemedText type="link">Read the Expo docs</ThemedText>
        </ExternalLink>
        <ExternalLink href="https://expo.dev">
          <ThemedText type="link">Visit Expo</ThemedText>
        </ExternalLink>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
