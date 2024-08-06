return {
  {
    "nvim-treesitter/nvim-treesitter",
    opts = function(_, opts)
      vim.list_extend(opts.ensure_installed, {
        "ocaml",
      })
    end,
  },
  --{
  --  "neovim/nvim-lspconfig",
  --  opts = {
  --    -- make sure mason install the server
  --    servers = {
  --      ---@type lspconfig.options.ocamllsp
  --      ocamllsp = {

  --      }
  --    }
  --  }
  --},
  {
    "williamboman/mason.nvim",
    opts = function(_, opts)
      opts.ensure_installed = opts.ensure_installed or {}
      table.insert(opts.ensure_installed, "ocaml-lsp")
    end,
  },
}
