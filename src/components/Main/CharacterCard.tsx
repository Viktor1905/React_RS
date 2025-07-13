import { Component } from 'react';
import type { AnimeCharacter } from '../../api/api.ts';
import styles from '@/components/Main/styles/character.module.css';

interface CardState {
  character: AnimeCharacter;
}
export class CharacterCard extends Component<CardState> {
  render() {
    return (
      <li className={styles.card}>
        <img
          src={this.props.character.images.jpg.image_url}
          className={styles.img}
        />
        <div>{this.props.character.name}</div>
        <div>
          More info:
          <a href={this.props.character.url}> Here</a>
        </div>
      </li>
    );
  }
}
