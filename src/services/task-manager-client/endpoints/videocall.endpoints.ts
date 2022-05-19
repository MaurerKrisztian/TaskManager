import { Injectable } from '@angular/core';
import { RESTEndpoints } from '../services/REST.endpoints';

export interface IRoomOptions {
  name: string;
  privacy?: string;
  properties?: {
    enable_knocking?: boolean;
    nbf?: number;
    exp?: number;
    max_participants?: number;
    autojoin?: boolean;
    enable_screenshare?: boolean;
    enable_chat?: boolean;
    start_video_off?: boolean;
    start_audio_off?: boolean;
    owner_only_broadcast?: boolean;
    enable_recording?: string;
    eject_at_room_exp?: boolean;
    eject_after_elapsed?: number;
    lang?: string;
  };
}

@Injectable()
export class VideoCall extends RESTEndpoints<{
  room: IRoomOptions;
  members: { name: string; email: string }[];
}> {
  endpoint = 'videocall';
}
