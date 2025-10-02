/* import { oktaAuth } from "@/auth/oktaConfig";
import { eventBus } from "../events/eventBus";

type WSOptions = { url: string; reconnectDelayMs?: number };

export class WSClient {
  private ws?: WebSocket;
  private closed = false;
  private delay: number;
  constructor(private opts: WSOptions) {
    this.delay = opts.reconnectDelayMs ?? 1500;
  }

  async connect() {
    this.closed = false;
    const token = oktaAuth.getAccessToken(); // access token
    const url = new URL(this.opts.url);
    if (token) url.searchParams.set("access_token", token);

    this.ws = new WebSocket(url.toString());

    this.ws.onopen = () => {
      this.delay = 1500; // reset
    };

    this.ws.onmessage = (evt) => {
      try {
        const { type, payload } = JSON.parse(evt.data);
        eventBus.emit(type, payload); // re-publica hacia el bus
      } catch {}
    };

    this.ws.onclose = () => {
      if (!this.closed) {
        setTimeout(() => this.connect(), this.delay);
        this.delay = Math.min(this.delay * 2, 15000); // backoff
      }
    };

    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  close() {
    this.closed = true;
    this.ws?.close();
  }
}

// singleton
export const wsClient = new WSClient({ url: "ws://localhost:3001/ws" });
 */
