/**
 * @enum Theme
 * @public
 */
export enum Theme {
  DEFAULT = 'default',
  DARK = 'dark',
  LIGHT = 'light',
}


/**
 * @class ThemeEntity
 * @public
 */
export class ThemeEntity {

  public static get DEFAULT(): Theme { return Theme.DEFAULT; }

  public static get DARK(): Theme { return Theme.DARK; }

  public static get LIGHT(): Theme { return Theme.LIGHT; }

}
