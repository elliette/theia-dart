import { injectable, inject } from '@theia/core/shared/inversify';
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService, URI } from '@theia/core/lib/common';
import { CommonMenus, FrontendApplication, FrontendApplicationContribution, open, OpenerService } from '@theia/core/lib/browser';
import { FrontendApplicationStateService } from '@theia/core/lib/browser/frontend-application-state';
import { MonacoEditor } from '@theia/monaco/lib/browser/monaco-editor';
import { EditorManager } from '@theia/editor/lib/browser/editor-manager';

@injectable()
export class DartDevToolsIntegrationFrontendContribution implements FrontendApplicationContribution {
    
    @inject(FrontendApplicationStateService)
    protected readonly stateService: FrontendApplicationStateService;

    @inject(OpenerService)
    protected readonly openerService: OpenerService;

    @inject(EditorManager)
    protected readonly editorManager: EditorManager;

    onStart(_: FrontendApplication): void {
        this.stateService.reachedState('ready').then(
            () => this.handleTheiaReady()
        );
    }

    handleTheiaReady(): void {
        // Listen for messages from Dart Devtools:
        window.addEventListener("message", event => this.handleMessage(event), false);
        // Notify Dart DevTools that Theia is ready:
        window.parent.postMessage('THEIA_IFRAME_READY', '*');
    }

    protected async openFile(filePath: string) {
        const uri = new URI(filePath)
        await open(this.openerService, uri);
        // Hack to make the opened file read-only:
        const editorWidget = await this.editorManager.getByUri(uri);
        if (editorWidget) {
            const { editor } = editorWidget;
            if (editor instanceof MonacoEditor) {
                const monacoEditor = (editor as any).editor;
                monacoEditor.updateOptions({ readOnly: true });
            }
        }
    }

    protected handleMessage(event: any): void {
        // DevTools sends message with file URI to open:
        if (event.data.startsWith('file://')) {
            this.openFile(event.data);
        }
    }
}

export const DartDevToolsIntegrationCommand = {
    id: 'DartDevToolsIntegration.command',
    label: "Shows a message"
};

@injectable()
export class DartDevToolsIntegrationCommandContribution implements CommandContribution {

    @inject(MessageService)
    protected readonly messageService: MessageService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(DartDevToolsIntegrationCommand, {
            execute: () => this.messageService.info('Dart DevTools integration!')
        });
    }
}

@injectable()
export class DartDevToolsIntegrationMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: DartDevToolsIntegrationCommand.id,
            label: 'Dart DevTools Integration?'
        });
    }
}
