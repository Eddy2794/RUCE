import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigService } from '../@vex/config/config.service';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { VexConfigName } from '../@vex/config/config-name.model';
import { ColorSchemeName } from '../@vex/config/colorSchemeName';
import { MatIconRegistry, SafeResourceUrlWithIconOptions } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ColorVariable, colorVariables } from '../@vex/components/config-panel/color-variables';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private configService: ConfigService,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService,
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer) {
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.matIconRegistry.addSvgIconResolver(
      (
        name: string,
        namespace: string
      ): SafeResourceUrl | SafeResourceUrlWithIconOptions | null => {
        switch (namespace) {
          case 'mat':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/material-design-icons/two-tone/${name}.svg`
            );

          case 'logo':
            return this.domSanitizer.bypassSecurityTrustResourceUrl(
              `assets/img/icons/logos/${name}.svg`
            );

          // case 'flag':
          //   return this.domSanitizer.bypassSecurityTrustResourceUrl(
          //     `assets/img/icons/flags/${name}.svg`
          //   );
        }
      }
    );

    /**
     * Customize the template to your needs with the ConfigService
     * Example:
     *  this.configService.updateConfig({
     *    sidenav: {
     *      title: 'Custom App',
     *      imageUrl: '//placehold.it/100x100',
     *      showCollapsePin: false
     *    },
     *    footer: {
     *      visible: false
     *    }
     *  });
     */
    this.configService.updateConfig({
      sidenav: {
        title: 'RUCE',
        imageUrl: 'assets/img/logo-ruce/logo_energia_viva.png',
        showCollapsePin: true,
        search: {
          visible: false
        }
      },
      footer: {
        visible: false
      }
    });

    /**
     * Config Related Subscriptions
     * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
     * Example: example.com/?layout=apollo&style=default
     */
    this.route.queryParamMap.subscribe(queryParamMap => {
      if (queryParamMap.has('layout')) {
        this.configService.setConfig(queryParamMap.get('layout') as VexConfigName);
      }

      if (queryParamMap.has('style')) {
        this.configService.updateConfig({
          style: {
            colorScheme: queryParamMap.get('style') as ColorSchemeName
          }
        });
      }

      if (queryParamMap.has('primaryColor')) {
        const color: ColorVariable = colorVariables[queryParamMap.get('primaryColor')];

        if (color) {
          this.configService.updateConfig({
            style: {
              colors: {
                primary: color
              }
            }
          });
        }
      }

      if (queryParamMap.has('rtl')) {
        this.configService.updateConfig({
          direction: coerceBooleanProperty(queryParamMap.get('rtl')) ? 'rtl' : 'ltr'
        });
      }
    });

    /**
     * Add your own routes here
     */
    this.navigationService.items = [
/*       {
        type: 'subheading',
        label: 'Principal',
        children: [
          {
            type: 'link',
            label: 'Planes de Estudio',
            route: '/pages/planestudio'
          }
        ]
      },
      {
        type: 'subheading',
        label: 'Gestión de POF',
        children: [
          {
            type: 'link',
            label: 'Cargos Salariales',
            route: '/pages/cargosalarial'
          },
          {
            type: 'link',
            label: 'Cargos Funcionales',
            route: '/pages/cargofuncional'
          },
          {
            type: 'link',
            label: 'Plazas',
            route: '/pages/plaza'
          },
          {
            type: 'link',
            label: 'Presupuesto',
            route: '/pages/presupuesto'
          }

        ]
      },
      {
        type: 'subheading',
        label: 'Organismos',
        children: [
          {
            type: 'link',
            label: 'Buscador con Filtros',
            route: '/pages/ejbuscfiltr',
            icon: 'mat:touch_app',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Wizard',
            route: '/pages/wizard-ejemplo',
            icon: 'mat:insights',
            routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Tabs',
            route: '/pages/tabs-ejemplo',
            icon: 'mat:insights',
            routerLinkActiveOptions: { exact: true }
          }
        ]
      }, */
      {
        type: 'subheading',
        label: 'Panel',
        children: [
          {
            type: 'link',
            label: 'Panel de Inicio',
            route: '/pages/inicio',
            icon: 'mat:insights',
            routerLinkActiveOptions: { exact: true }
          },
        ]
      },


      {
        type: "subheading",
        label: 'Principal',
        children: [
          {
            type: 'link',
            label: 'Instituciones',
            route: '/pages/establecimientos',
            icon: 'mat:school',
            //routerLinkActiveOptions: { exact: true }
          },
          {
            type: 'link',
            label: 'Cooperadoras',
            route: '/pages/cooperadoras',
            icon: 'mat:diversity_2',
            //routerLinkActiveOptions: { exact: true }
          }
          // {
          //   type: 'link',
          //   label: 'Buscador con Filtros',
          //   route: '/pages/ejbuscfiltr',
          //   icon: 'mat:touch_app',
          //   routerLinkActiveOptions: { exact: true }
          // },
          // {
          //   type: 'link',
          //   label: 'Wizard',
          //   route: '/pages/wizard-ejemplo',
          //   icon: 'mat:insights',
          //   routerLinkActiveOptions: { exact: true }
          // },
          // {
          //   type: 'link',
          //   label: 'Tabs',
          //   route: '/pages/tabs-ejemplo',
          //   icon: 'mat:insights',
          //   routerLinkActiveOptions: { exact: true }
          // },
        ]
      },

      {
        type: 'subheading',
        label: 'Gestión de Cooperadora',
        children: [
          {
            type: 'link',
            label: 'Cargos',
            route: '/pages/cargos',
            icon: 'mat:supervised_user_circle',
          },
          {
            type: 'link',
            label: 'Instancias Instrumento',
            route: '/pages/instancia-instrumento',
            icon: 'mat:done_all',
          },
          {
            type: 'link',
            label: 'Tipos de Asociación',
            route: '/pages/tipo-asociacion',
            icon: 'mat:edit',
          },
          {
            type: 'link',
            label: 'Tipos de Comisión',
            route: '/pages/tipo-comision',
            icon: 'mat:edit',
          },
          {
            type: 'link',
            label: 'Tipos de Documentos',
            route: '/pages/tipo-documento',
            icon: 'mat:edit',
          },
          {
            type: 'link',
            label: 'Tipos de Fondos',
            route: '/pages/tipo-fondo',
            icon: 'mat:monetization_on',
          },
          {
            type: 'link',
            label: 'Gestión de Usuarios',
            route: '/pages/usuarios',
            icon: 'mat:account_circle',
          }
        ]
      },

    ];
  }
}
