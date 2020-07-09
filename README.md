# @eddienko/jupyterlab-colabinspired-codecellbtn

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/eddienko/jupyterlab-colabinspired-codecellbtn/binder?urlpath=/lab/tree/demo/demo.ipynb)

A JupyterLab extension for notebook cells that adds a set of buttons to each cell.
The following buttons are added:

* Run cell
* Add cell above
* Add cell below
* Format code in cell (requires extension [@ryantam626/jupyterlab_code_formatter](https://github.com/ryantam626/jupyterlab_code_formatter))
* Move cell up
* Movel cell down
* Delete cell

Most of the code of this extension has been borrowed from [@ibqn/jupyterlab-codecellbtn](https://github.com/ibqn/jupyterlab-codecellbtn)

![screenshot](screenshot.png)

## Prerequisites

* JupyterLab
* @eddienko/jupyterlab-colabinspired-theme-light

## Installation

Note that in order to view the buttons you also need to install a theme:

```bash
jupyter labextension install @eddienko/jupyterlab-colabinspired-codecellbtn \
                             @eddienko/jupyterlab-colabinspired-theme-light
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

