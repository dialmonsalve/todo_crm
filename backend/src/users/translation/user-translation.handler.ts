import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class UserTranslationHandler {
  constructor(private readonly i18n: I18nService) {}

  create(name: string): string {
    return this.i18n.t('user.CREATED', { lang: this.lang, args: { name } });
  }

  update(name: string): string {
    return this.i18n.t('user.UPDATED', { lang: this.lang, args: { name } });
  }

  toggle(name: string, isActive: boolean): string {
    const key = isActive ? 'user.ACTIVATED' : 'user.DEACTIVATED';
    return this.i18n.t(key, { lang: this.lang, args: { name } });
  }

  general(key: string): string {
    return this.i18n.t(key, { lang: this.lang });
  }

  private get lang(): string {
    return I18nContext.current()?.lang ?? 'es';
  }
}
