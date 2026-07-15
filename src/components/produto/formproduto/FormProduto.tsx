import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProdutoService from "../../../services/ProdutoService";
import CategoriaService from "../../../services/CategoriaService";
import type { Produto } from "../../../models/Produto";

const STATUS_OPCOES = ["Pendente", "Pago", "Atrasado"];

const produtoSchema = z.object({
    nome: z.string().min(3, "Informe o nome da cobrança"),
    valorDebito: z.coerce.number().positive("Informe um valor maior que zero"),
    dataDebito: z.string().min(1, "Informe a data do débito"),
    status: z.string().min(1, "Selecione um status"),
    categoriaId: z.coerce.number().min(1, "Selecione uma categoria"),
});

type ProdutoFormData = z.infer<typeof produtoSchema>;

function FormProduto() {
    const { id } = useParams<{ id: string }>();
    const emEdicao = Boolean(id);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [erro, setErro] = useState("");

    const { data: categorias } = useQuery({
        queryKey: ["categorias"],
        queryFn: async () => (await CategoriaService.getAll()).data,
    });

    const { data: produtoAtual, isLoading: carregandoProduto } = useQuery({
        queryKey: ["produtos", id],
        queryFn: async () => (await ProdutoService.getById(Number(id))).data,
        enabled: emEdicao,
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProdutoFormData>({
        resolver: zodResolver(produtoSchema),
    });

    // Assim que a cobrança existente chega da API, preenche o formulário.
    useEffect(() => {
        if (produtoAtual) {
            reset({
                nome: produtoAtual.nome,
                valorDebito: produtoAtual.valorDebito,
                dataDebito: produtoAtual.dataDebito,
                status: produtoAtual.status,
                categoriaId: produtoAtual.categoria?.id ?? 0,
            });
        }
    }, [produtoAtual, reset]);

    const mutation = useMutation({
        mutationFn: async (dados: ProdutoFormData) => {
            const categoria = categorias?.find((c) => c.id === dados.categoriaId) ?? null;

            const payload: Produto = {
                id: emEdicao ? Number(id) : 0,
                nome: dados.nome,
                valorDebito: dados.valorDebito,
                dataDebito: dados.dataDebito,
                status: dados.status,
                categoria,
                usuario: produtoAtual?.usuario ?? null,
            };

            return emEdicao ? ProdutoService.put(payload) : ProdutoService.post(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["produtos"] });
            navigate("/produtos");
        },
        onError: () => {
            setErro("Não foi possível salvar a cobrança. Confira os dados e tente novamente.");
        },
    });

    function onSubmit(dados: ProdutoFormData) {
        setErro("");
        mutation.mutate(dados);
    }

    if (emEdicao && carregandoProduto) {
        return (
            <div className="flex justify-center items-center py-16">
                <p className="text-gray-500">Carregando cobrança...</p>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center py-16 px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    {emEdicao ? "Editar Cobrança" : "Nova Cobrança"}
                </h1>

                {erro && (
                    <p className="text-sm text-red-600 text-center">{erro}</p>
                )}

                <div className="flex flex-col gap-1">
                    <label htmlFor="nome" className="text-sm font-medium text-gray-700">
                        Nome
                    </label>
                    <input
                        id="nome"
                        type="text"
                        {...register("nome")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.nome && (
                        <span className="text-xs text-red-600">{errors.nome.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="valorDebito" className="text-sm font-medium text-gray-700">
                        Valor do débito (R$)
                    </label>
                    <input
                        id="valorDebito"
                        type="number"
                        step="0.01"
                        min="0"
                        {...register("valorDebito")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.valorDebito && (
                        <span className="text-xs text-red-600">{errors.valorDebito.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="dataDebito" className="text-sm font-medium text-gray-700">
                        Data do débito
                    </label>
                    <input
                        id="dataDebito"
                        type="date"
                        {...register("dataDebito")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    {errors.dataDebito && (
                        <span className="text-xs text-red-600">{errors.dataDebito.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="status" className="text-sm font-medium text-gray-700">
                        Status
                    </label>
                    <select
                        id="status"
                        defaultValue=""
                        {...register("status")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="" disabled>Selecione...</option>
                        {STATUS_OPCOES.map((status) => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    {errors.status && (
                        <span className="text-xs text-red-600">{errors.status.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="categoriaId" className="text-sm font-medium text-gray-700">
                        Categoria
                    </label>
                    <select
                        id="categoriaId"
                        defaultValue=""
                        {...register("categoriaId")}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="" disabled>Selecione...</option>
                        {categorias?.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>
                    {errors.categoriaId && (
                        <span className="text-xs text-red-600">{errors.categoriaId.message}</span>
                    )}
                    {categorias?.length === 0 && (
                        <span className="text-xs text-gray-500">Nenhuma categoria cadastrada ainda.</span>
                    )}
                </div>

                <div className="flex gap-3 mt-2">
                    <button
                        type="button"
                        onClick={() => navigate("/produtos")}
                        className="flex-1 border border-gray-300 text-gray-700 rounded-md py-2 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={mutation.isPending}
                        className="flex-1 bg-gradient-to-r from-[#a717eb] to-[#00e8ff] text-white font-semibold rounded-md py-2 disabled:opacity-60"
                    >
                        {mutation.isPending ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormProduto;
