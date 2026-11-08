import { ArrowUpRight, Disc3, ExternalLink, Music2 } from "lucide-react";
import type { Copy } from "../types";

export function DiscordPreview({ copy }: { copy: Copy }) {
  return (
    <div className="discord-showcase" role="group" aria-label={copy.hero.sampleLabel}>
      <div className="preview-heading">
        <span>{copy.hero.discord}</span>
        <span className="preview-caption">{copy.hero.sampleLabel}</span>
      </div>
      <div className="discord-window">
        <div className="discord-channel">
          <span className="channel-hash">#</span>
          <span>{copy.hero.channel}</span>
          <span className="channel-divider" />
          <span className="channel-topic">{copy.hero.channelTopic}</span>
        </div>
        <div className="discord-messages">
          <div className="discord-user-message">
            <div className="discord-avatar user-avatar" aria-hidden="true">k</div>
            <div className="message-content">
              <div className="author-line">
                <strong>{copy.hero.user}</strong>
                <span className="role-tag">{copy.hero.role}</span>
                <span className="timestamp">{copy.hero.timestamp}</span>
              </div>
              <p>{copy.hero.prefixCommand}</p>
            </div>
          </div>
          <div className="discord-bot-message">
            <div className="discord-avatar bot-avatar">
              <img src={`${import.meta.env.BASE_URL}branding/riffrelay-icon.svg`} alt="" />
            </div>
            <div className="message-content">
              <div className="author-line">
                <strong>{copy.hero.bot}</strong>
                <span className="app-tag">{copy.hero.appBadge}</span>
                <Disc3 className="bot-mark" size={14} aria-hidden="true" />
                <span className="timestamp">{copy.hero.timestamp}</span>
              </div>
              <div className="track-embed">
                <p className="embed-intro">{copy.hero.listening}</p>
                <div className="embed-track-row">
                  <div className="track-copy">
                    <strong>{copy.hero.track}</strong>
                    <span>{copy.hero.artist}</span>
                  </div>
                  <div className="track-actions" role="img" aria-label={copy.hero.actionsLabel}>
                    <svg className="youtube-mark" width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
                      <path fill="#29272b" d="m10 8.25 6.5 3.75-6.5 3.75v-7.5Z" />
                    </svg>
                    <ExternalLink size={14} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="preview-footnote">
        <Music2 size={14} aria-hidden="true" />
        <span>{copy.hero.previewLabel}</span>
        <ArrowUpRight size={14} aria-hidden="true" />
      </div>
    </div>
  );
}
