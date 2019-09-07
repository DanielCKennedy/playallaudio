declare module 'soundcloud' {
    import { Promise } from 'es6-promise';

    interface SoundCloud {
      initialize(options: SoundCloud.InitializeOptions): void;
      connect(options?: SoundCloud.ConnectOptions): Promise<any>;
    
      get(path: string, params?: any): Promise<any>;
      post(path: string, params?: any): Promise<any>;
      put(path: string, params?: any): Promise<any>;
      delete(path: string): Promise<any>;
    
      upload(options: any): Promise<any>;
      resolve(url: string): Promise<any>;
      oEmbed(url: string, params?: any): Promise<any>;
    
      stream(trackPath: string, secretToken?: string): Promise<SoundCloud.Player>;
    }
    
    declare namespace SoundCloud {
      interface InitializeOptions {
        client_id: string;
        redirect_uri?: string;
        oauth_token?: string;
      }
    
      interface ConnectOptions {
        client_id: string;
        redirect_uri: string;
        scope?: string;
      }
    
      type player_event =
        'state-change' | // when audio controller changes state (e.g. from pause to play). Possible values: 'playing', 'paused', 'loading', 'ended', 'error' or 'dead'
        'play' | // when play method is called
        'play-start' | // when playback actually starts, the first time
        'play-resume' | // when playback starts, the second time onwards
        'play-rejection' | // if a play request is rejected by the browser
        'pause' | // when playback is paused
        'finish' | // when sound is finished
        'seek' | // when seek method is called
        'seeked' | // when a seek completes
        'seek-rejection' | // when a seek is rejected for some reason
        'geo_blocked' | // when there's no available streams for a sound, as it is not allowed to be played in the user's territory.
        'buffering_start' | // when buffering starts
        'buffering_end' | // when buffering stops
        'audio_error' | // when an error occurs
        'time' | // when playback position is updated
        'no_streams' | // when we failed fetching stream information
        'no_protocol' | // when no supported protocol could be found
        'no_connection'; // when we failed to connect to an endpoint due to missing transport or request timeout

      interface Player {
        play(): Promise<any>;
        pause(): void;
        seek(time: number): Promise<any>;
        currentTime(): number;
        setVolume(volume: number): void;
        getVolume(): number;
        getDuration(): number;
        isBuffering(): boolean;
        isPlaying(): boolean;
        isActuallyPlaying(): boolean;
        hasErrored(): boolean;
        isDead(): boolean;
        getState(): 'playing' | 'paused' | 'loading' | 'ended' | 'dead';
        kill(): void;
        on(event: player_event, handler: any): void;
      }
    
      interface User {
        avatar_url: string;
        id: number;
        kind: string;
        permalink_url: string;
        uri: string;
        username: string;
        permalink: string;
        last_modified: string;
        track_count: number;
        followers_count: number;
      }
    
      interface Track {
        id: number;
        kind: string;
        created_at: string;
        last_modified: string;
        permalink: string;
        permalink_url: string;
        title: string;
        duration: number;
        sharing: string;
        waveform_url: string;
        stream_url: string;
        uri: string;
        user_id: number;
        artwork_url: string;
        comment_count: number;
        commentable: boolean;
        description: string;
        download_count: number;
        downloadable: boolean;
        embeddable_by: string;
        favoritings_count: number;
        genre: string;
        isrc: string;
        label_id?: any;
        label_name: string;
        license: string;
        original_content_size: number;
        original_format: string;
        playback_count: number;
        purchase_title: string;
        purchase_url: string;
        release: string;
        release_day?: number;
        release_month?: number;
        release_year?: number;
        reposts_count: number;
        state: string;
        streamable: boolean;
        tag_list: string;
        track_type: string;
        user: User;
        likes_count: number;
        attachments_uri: string;
        bpm?: any;
        key_signature: string;
        user_favorite: boolean;
        user_playback_count?: any;
        video_url?: any;
        download_url?: any;
      }
    }
    
    declare let SoundCloud: SoundCloud;
    export = SoundCloud;
}
