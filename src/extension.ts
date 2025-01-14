/**
 * IntelliOverlayer: Extension for Overlayer IntelliCode
 *
 * author: Runas
 */

import { languages, ExtensionContext } from 'vscode';
import { Intelligence } from "./intelligence";
import { getHover, getSuggest } from './IGetter';
import { consume } from './util';

// On Activated
export function activate(context: ExtensionContext) {
  Intelligence.init();

  context.subscriptions.push(
    languages.registerCompletionItemProvider(
      { language: 'javascript', scheme: 'file', },
      { provideCompletionItems: consume(getSuggest('js'), []) },
    ),
    languages.registerCompletionItemProvider(
      { language: 'python', scheme: 'file', },
      { provideCompletionItems: consume(getSuggest('py'), []) },
    ),
    languages.registerHoverProvider(
      { language: 'javascript', scheme: 'file', },
      { provideHover: consume(getHover('js'), undefined) },
    ),
    languages.registerHoverProvider(
      { language: 'python', scheme: 'file', },
      { provideHover: consume(getHover('py'), undefined) },
    ),
  );
}

// On Deactivated
export function deactivate() {}
