import { DartDevToolsIntegrationCommandContribution, DartDevToolsIntegrationFrontendContribution, DartDevToolsIntegrationMenuContribution } from './dart-devtools-integration-contribution';
import { ContainerModule } from '@theia/core/shared/inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { CommandContribution, MenuContribution } from '@theia/core';

export default new ContainerModule(bind => {
    bind(DartDevToolsIntegrationFrontendContribution).toSelf().inSingletonScope;
    bind(FrontendApplicationContribution).toService(DartDevToolsIntegrationFrontendContribution);
    bind(CommandContribution).to(DartDevToolsIntegrationCommandContribution);
    bind(MenuContribution).to(DartDevToolsIntegrationMenuContribution);
});
