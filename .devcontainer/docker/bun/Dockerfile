# [Choice] Debian OS version: bullseye, buster
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:20-bullseye

ARG USERNAME=root
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

ENV BUN_INSTALL=/bun
RUN sudo mkdir -p ${BUN_INSTALL} \
    && curl -fsSL https://bun.sh/install | bash \
    && chown -R ${USERNAME} /bun

ENV PATH=${BUN_INSTALL}/bin:${PATH}