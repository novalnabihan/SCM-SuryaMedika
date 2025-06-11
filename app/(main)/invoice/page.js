"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

export default function InvoicePage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/invoices`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        console.error("Gagal mengambil data invoice:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading)
    return <div className="p-6 text-gray-500">Memuat data invoice...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-cyan-900">Daftar Invoice</h1>

      {invoices.length === 0 ? (
        <div className="text-gray-500">Belum ada invoice tercatat.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {invoices.map((invoice) => (
            <Link key={invoice.id} href={`/invoice/${invoice.id}`}>
              <Card className="p-5 border border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-900">
                      {invoice.invoiceCode}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Tanggal:{" "}
                      {new Date(invoice.transactionDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className="text-sm px-3 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: invoice.paymentStatus
                        ? "#DCFCE7"
                        : "#FEF3C7",
                      color: invoice.paymentStatus ? "#166534" : "#92400E",
                    }}
                  >
                    {invoice.paymentStatus ? "Lunas" : "Belum Lunas"}
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
                  <div>Jumlah Item: {invoice.totalItems}</div>
                  <div>
                    Total Nilai:{" "}
                    <span className="font-medium text-gray-900">
                      Rp{" "}
                      {typeof invoice.totalAmount === "number"
                        ? invoice.totalAmount.toLocaleString()
                        : "0"}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
