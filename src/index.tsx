import * as React from 'react';

import { ReactWidget } from '@jupyterlab/apputils';

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import {
  INotebookTracker,
  NotebookPanel,
  NotebookActions
} from '@jupyterlab/notebook';

import { ICellFooter, Cell } from '@jupyterlab/cells';

import { ReadonlyPartialJSONObject } from '@lumino/coreutils';

import { CommandRegistry } from '@lumino/commands';

import { IEditorServices } from '@jupyterlab/codeeditor';

import '../style/index.css';

/**
 * The CSS classes added to the cell footer.
 */
const CELL_FOOTER_CLASS = 'jp-CellFooter';
const CELL_FOOTER_DIV_CLASS = 'ccb-cellFooterContainer';
const CELL_FOOTER_BUTTON_CLASS = 'ccb-cellFooterBtn';

function activateCommands(
  app: JupyterFrontEnd,
  tracker: INotebookTracker
): Promise<void> {
  // tslint:disable-next-line:no-console
  console.log('JupyterLab extension jupyterlab-cellcodebtn is activated!');

  Promise.all([app.restored]).then(([params]) => {
    const { commands, shell } = app;

    function getCurrent(args: ReadonlyPartialJSONObject): NotebookPanel | null {
      const widget = tracker.currentWidget;
      const activate = args.activate !== false;

      if (activate && widget) {
        shell.activateById(widget.id);
      }

      return widget;
    }

    function isEnabled(): boolean {
      return (
        tracker.currentWidget !== null &&
        tracker.currentWidget === app.shell.currentWidget
      );
    }

    commands.addCommand('run-selected-codecell', {
      label: 'Run Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { context, content } = current;
          NotebookActions.run(content, context.sessionContext);
          // current.content.mode = 'edit';
        }
      },
      isEnabled
    });

    commands.addCommand('delete-selected-codecell', {
      label: 'Delete Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { context, content } = current;
          NotebookActions.deleteCells(content);
          console.log(context);
          // current.content.mode = 'edit';
        }
      },
      isEnabled
    });


    commands.addCommand('moveup-selected-codecell', {
      label: 'Delete Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { context, content } = current;
          NotebookActions.moveUp(content);
          console.log(context);
          // current.content.mode = 'edit';
        }
      },
      isEnabled
    });


    commands.addCommand('movedown-selected-codecell', {
      label: 'Delete Cell',
      execute: args => {
        const current = getCurrent(args);

        if (current) {
          const { context, content } = current;
          NotebookActions.moveDown(content);
          console.log(context);
          // current.content.mode = 'edit';
        }
      },
      isEnabled
    });


  });

  return Promise.resolve();
}

/**
 * Extend the default implementation of an `IContentFactory`.
 */
export class ContentFactoryWithFooterButton extends NotebookPanel.ContentFactory {
  constructor(
    commands: CommandRegistry,
    options?: Cell.ContentFactory.IOptions | undefined
  ) {
    super(options);
    this.commands = commands;
  }
  /**
   * Create a new cell header for the parent widget.
   */
  createCellFooter(): ICellFooter {
    return new CellFooterWithButton(this.commands);
  }

  private readonly commands: CommandRegistry;
}

/**
 * Extend default implementation of a cell footer.
 */
export class CellFooterWithButton extends ReactWidget implements ICellFooter {
  /**
   * Construct a new cell footer.
   */
  constructor(commands: CommandRegistry) {
    super();
    this.addClass(CELL_FOOTER_CLASS);
    this.commands = commands;
  }

  private readonly commands: CommandRegistry;

  render() {
    return (
      <div className={CELL_FOOTER_DIV_CLASS}>
        <button
          className={CELL_FOOTER_BUTTON_CLASS}
          onClick={event => {
            this.commands.execute('run-selected-codecell');
          }}
        >
<svg width="16" height="16" viewBox="0 0 24 24">
   <path fill="#000000" d="M8,5.14V19.14L19,12.14L8,5.14Z"></path>
</svg>
        </button>

        <button
          className={CELL_FOOTER_BUTTON_CLASS}
          onClick={event => {
            this.commands.execute('jupyterlab_code_formatter:format');
          }}
        >
<svg width="16" height="16" viewBox="0 0 24 24">
   <path fill="#000000" d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" />
</svg>

        </button>

        <button
          className={CELL_FOOTER_BUTTON_CLASS}
          onClick={event => {
            this.commands.execute('moveup-selected-codecell');
          }}
        >
<svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#000000" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
</svg>
        </button>

        <button
          className={CELL_FOOTER_BUTTON_CLASS}
          onClick={event => {
            this.commands.execute('movedown-selected-codecell');
          }}
        >
<svg width="16" height="16" viewBox="0 0 24 24">
    <path fill="#000000" d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" />
</svg>
        </button>

        <button
          className={CELL_FOOTER_BUTTON_CLASS}
          onClick={event => {
            this.commands.execute('delete-selected-codecell');
          }}
        >
<svg width="16" height="16" viewBox="0 0 24 24">
   <path fill="#000000" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
</svg>

        </button>



      </div>
    );
  }
}

/**
 * The fooet button extension for the code cell.
 */
const footerButtonExtension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-cellcodebtn',
  autoStart: true,
  activate: activateCommands,
  requires: [INotebookTracker]
};

/**
 * The notebook cell factory provider.
 */
const cellFactory: JupyterFrontEndPlugin<NotebookPanel.IContentFactory> = {
  id: '@eddienko/jupyterlab-colabinspired-codecellbtn:factory',
  provides: NotebookPanel.IContentFactory,
  requires: [IEditorServices],
  autoStart: true,
  activate: (app: JupyterFrontEnd, editorServices: IEditorServices) => {
    // tslint:disable-next-line:no-console
    console.log(
      'JupyterLab extension jupyterlab-cellcodebtn',
      'overrides default nootbook content factory'
    );

    const { commands } = app;
    const editorFactory = editorServices.factoryService.newInlineEditor;
    return new ContentFactoryWithFooterButton(commands, { editorFactory });
  }
};

/**
 * Export this plugins as default.
 */
const plugins: Array<JupyterFrontEndPlugin<any>> = [
  footerButtonExtension,
  cellFactory
];

export default plugins;
