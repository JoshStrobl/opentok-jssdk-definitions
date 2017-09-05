declare namespace OT {
	export interface ArchiveEvent extends Event {
		id: string;
		name: string;
	}

	export interface AudioLevelUpdatedEvent extends Event {
		audioLevel: number;
	}

	export interface Capabilities {
		forceDisconnect: 0 | 1;
		forceUnpublish: 0 | 1;
		publish: 0 | 1;
		subscribe: 0 | 1;
	}

	export interface Connection {
		connectionId: string;
		creationTime: number;
		data: string;
	}

	export interface ConnectionEvent extends Event {
		connection: Connection;
		reason: "clientDisconnected" | "forceDisconnected" | "networkDisconnected";
	}

	export interface Device {
		kind: "audioInput" | "videoInput";
		deviceId: string;
		label: string;
	}

	export interface EventContext {
		[eventName: string]: EventListener;
	}

	export interface ExceptionEvent extends Event {
		code: 1004 | 1005 | 1006 | 1007 | 1008 | 1009 | 1010 | 1011 | 1013 | 1014 | 1026 | 1500 | 1520 | 1530 | 1535 | 2000 | 2010;
		message: string;
		title: string;
	}

	export interface OnOffOnce {
		// Off
		off(): void;
		off(type?: string, handler?: Function, context?: Object): void;
		off(context: EventContext): void;

		// On
		on(type?: string, handler?: Function, context?: Object): void;
		on(context: EventContext): void;

		// Once
		once(type?: string, handler?: Function, context?: Object): void;
		once(context: EventContext): void;
	}

	export interface Publisher extends SharedStreamData {
		accessAllowed: Event;
		accessDenied: Event;
		accessDialogClosed: Event;
		accessDialogOpened: Event;
		mediaStopped: StreamEvent;
		element: HTMLElement;
		id: string;
		streamCreated: StreamEvent;
		streamDestroyed: StreamEvent;
		stream: Stream;
		session: Session;

		// #region Functions

		destroy(): Publisher;

		publishAudio(value: boolean): void;
		publishVideo(value: boolean): void;

		// #endregion
	}

	export interface PublisherProperties extends SharedUserProperties {
		audioBitrate?: number;
		audioFallbackEnabled?: boolean;
		audioSource?: string | null | false;
		disableAudioProcessing?: boolean;
		frameRate?: 1 | 7 | 15 | 30;
		maxResolution?: StreamVideoDimensions;
		mirror?: boolean;
		name?: string;
		publishAudio?: boolean;
		publishVideo?: boolean;
		resolution?: string;
		usePreviousDeviceSelection?: boolean;
		videoSource?: string;
	}

	export interface ScreenSharingCapability extends Object {
		extensionInstalled: boolean;
		supported: boolean;
		supportedSources: ScreenSharingSources;
		extensionRequired: "chrome" | undefined;
		extensionRegistered: boolean | undefined;
	}

	export interface ScreenSharingSources extends Object {
		application: boolean;
		screen: boolean;
		window: boolean;
	}

	export interface SessionConnection {
		connectionId: string;
		creationTime: number;
		data: string;
	}

	export interface Session extends OnOffOnce {
		archiveStarted: ArchiveEvent;
		archiveStopped: ArchiveEvent;
		capabilities: Capabilities;
		connection: SessionConnection;
		connectionCreated: ConnectionEvent;
		connectionDestroyed: ConnectionEvent;
		sessionConnected: ConnectionEvent;
		sessionDisconnected: ConnectionEvent;
		sessionReconnected: ConnectionEvent;
		sessionReconnecting: ConnectionEvent;
		sessionId: string;
		streamCreated: StreamEvent;
		streamDestroyed: StreamEvent;
		streamPropertyChanged: StreamPropertyChangedEvent;

		// Functions
		connect(token: string, completionHandler: (error: Error) => void): void;
		disconnect(): void;
		forceDisconnect(connection: SessionConnection, completionHandler: (error: Error) => void): void;
		forceUnpublish(stream: Stream, completionHandler: (error: Error) => void): void;
		getPublisherForStream(stream: Stream): Publisher;
		getSubscribersForStream(stream: Stream): Subscriber[];
		publish(publisher: Publisher, completionHandler: (error: Error) => void): Publisher;
		signal(data: SignalData, completionHandler: (error: Error) => void): void;
		subscribe(stream: Stream, targetElement?: HTMLElement, properties?: SubscribeProperties, completionHandler?: (error: Error) => void): Subscriber;
		unpublish(publisher: Publisher): void;
		unsubscribe(subscriber: Subscriber): void;
	}

	export interface SharedUserProperties {
		fitMode?: "cover" | "contain";
		height?: number | string;
		insertDefaultUI?: boolean;
		insertMode?: "replace" | "after" | "before" | "append";
		showControls?: boolean;
		style?: StreamStyleProperties;
		width?: number | string;
	}

	export interface SharedStreamData extends OnOffOnce {
		audioLevelUpdated: AudioLevelUpdatedEvent;
		connected: Event;
		destroyed: Event
		disconnected: Event;
		getImgData(): string;
		getStyle(): Object;
		videoDimensionsChanged: VideoDimensionsChangedEvent;
		videoElementCreated: VideoElementCreatedEvent;

		// #region Functions

		// SetStyle
		setStyle(style: "audioLevelDisplayMode", value: "auto" | "off" | "on"): Publisher;
		setStyle(style: "archiveStatusDisplayMode", value: "auto" | "off"): Publisher;
		setStyle(style: "backgroundImageURI", value: string): Publisher;
		setStyle(style: "buttonDisplayMode", value: "auto" | "off" | "on"): Publisher;
		setStyle(style: "nameDisplayMode", value: "auto" | "off" | "on"): Publisher;
		setStyle(value: StreamStyleProperties): void;

		videoHeight(): number;
		videoWidth(): number;

		// #endregion
	}

	export interface SignalData extends Object {
		to: Connection;
		data: string;
		retryAfterReconnect?: boolean;
		type: string;
	}

	export interface SignalEvent extends Event {
		data: SignalData;
		from: Connection;
		type: string;
	}

	export interface Stream {
		connection: SessionConnection;
		creationTime: number;
		frameRate: number | undefined;
		hasAudio: boolean;
		hasVideo: boolean;
		name: string;
		streamId: string;
		videoDimensions: StreamVideoDimensions;
		videoType: "camera" | "screen";
	}

	export interface StreamEvent extends Event {
		cancelable: boolean;
		reason: "clientDisconnected" | "forceDisconnected" | "forceUnpublished" | "mediaStopped" | "networkDisconnected";
		stream: Stream;
		type: "streamCreated" | "streamDestroyed";
	}

	export interface StreamPropertyChangedEvent extends Event {
		changedProperty: "hasAudio" | "hasVideo" | "videoDimensions";
		newValue: Object;
		oldValue: Object;
		stream: Stream;
	}

	export interface StreamStyleProperties {
		audioLevelDisplayMode?: "auto" | "off" | "on";
		backgroundImageURI?: string;
		buttonDisplayMode?: "auto" | "off" | "on";
		nameDisplayMode: "auto" | "off" | "on";
		videoDisabledDisplayMode: "auto" | "off" | "on";
	}

	export interface StreamVideoDimensions {
		height: number;
		width: number;
	}

	export interface SubscribeProperties extends SharedUserProperties {
		audioVolume?: number;
		preferredFrameRate?: number;
		preferredResolution?: StreamVideoDimensions;
		subscribeToAudio?: boolean;
		subscribeToVideo?: boolean;
		testNetwork?: boolean;
	}

	export interface Subscriber extends SharedStreamData {
		element: HTMLElement;
		id: string;
		stream: Stream;
		videoDisabled: VideoEnabledChangedEvent;
		videoDisableWarning: Event;
		videoDisableWarningLifted: Event;
		videoEnabled: VideoEnabledChangedEvent;

		// #region Functions

		getStats(completionHandler: (error: Error, stats: SubscriberStats) => void): void;
		restrictFrameRate(restrict: boolean): Subscriber;
		setAudioVolume(volume: number): Subscriber;
		setPreferredFrameRate(frameRate: number): void;
		setPreferredResolution(resolution: StreamVideoDimensions): void;
		subscribeToAudio(value: boolean): Subscriber;
		subscribeToVideo(value: boolean): Subscriber;

		// #endregion
	}

	export interface SubscriberStats {
		audio: SubscriberAudioStats;
		timestamp: number;
		video: SubscriberVideoStats;
	}

	export interface SubscriberAudioStats {
		bytesReceived: number;
		packetsLost: number;
		packetsReceived: number;
	}

	export interface SubscriberVideoStats {
		bytesReceived: number;
		frameRate: number;
		packetsLost: number;
		packetsReceived: number;
	}

	export interface VideoElementCreatedEvent extends Event {
		element: HTMLVideoElement;
	}

	export interface VideoEnabledChangedEvent extends Event {
		reason: "publishVideo" | "quality" | "subscribeToVideo";
		type: "videoDisabled" | "videoEnabled";
	}

	export interface VideoDimensionsChangedEvent extends Event {
		newValue: StreamVideoDimensions;
		oldValue: StreamVideoDimensions;
	}

	export interface InitOptions extends Object {
		connectionEventsSuppressed: boolean;
	}

	function checkScreenSharingCapability(callback: (options: OT.ScreenSharingCapability) => void): void;
	function checkSystemRequirements(): 0 | 1;
	function getDevices(callback: (error: Error | null, devices: OT.Device[]) => void): void;
	function initPublisher(targetElement: HTMLElement | string, properties: OT.PublisherProperties, completionHandler: (error: Error | null) => void): OT.Publisher;
	function initSession(apiKey: string, sessionId: string, options?: OT.InitOptions): OT.Session;
	function log(message: string): void;
	function off(type: string, handler: Function, context?: any): void;
	function on(type: string, handler: Function, context?: any): void;
	function once(type: string, handler: Function, context?: any): void;
	function registerScreenSharingExtension(kind: "chrome", id: string, version: number): void;
	function reportIssue(completionHandler: Function): void;
	function setLogLevel(level: number): void;
	function upgradeSystemRequirements(): void;
}
