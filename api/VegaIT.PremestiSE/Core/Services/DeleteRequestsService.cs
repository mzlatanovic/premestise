using Core.Interfaces.Intefaces;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;
using Persistence.Interfaces.Contracts;
using Microsoft.Extensions.DependencyInjection;
using Persistence.Interfaces.Entites;
using System.Collections.Generic;
using Core.Clients;
using System.Net.Mail;
using System.Linq;

namespace Core.Services
{
    public class DeleteRequestsService : IDeleteRequestsService, IHostedService, IDisposable
    {
        private readonly IPendingRequestRepository _pendingRequestRepository;
        private readonly IMatchedRequestRepository _matchedRequestRepository;
        private readonly IMailClient _mailClient;
        private readonly ILogger<DeleteRequestsService> _logger;
        private Timer _timer;

        public DeleteRequestsService(ILogger<DeleteRequestsService> logger, IServiceScopeFactory factory)
        {
            _logger = logger;
            _pendingRequestRepository = factory.CreateScope().ServiceProvider.GetRequiredService<IPendingRequestRepository>();
            _matchedRequestRepository = factory.CreateScope().ServiceProvider.GetRequiredService<IMatchedRequestRepository>();
            _mailClient = factory.CreateScope().ServiceProvider.GetRequiredService<IMailClient>();
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _timer = new Timer(DoWork, null, TimeSpan.Zero,
                TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            IEnumerable<PendingRequest> pendingRequests = _pendingRequestRepository.GetAll().Where(request => request.Verified);
            IEnumerable<MatchedRequest> machedRequests = _matchedRequestRepository.GetAll();

            foreach (PendingRequest request in pendingRequests)
            {
                if (request.ShouldBeDeleted)
                {
                    _pendingRequestRepository.Delete(request.Id);
                } else if (request.ShouldNotify)
                {
                    try
                    {
                        _mailClient.Send(request.ParentEmail, "Nažalost, još uvek Vam nismo pronašli adekvatnu zamenu. Za mesec dana biće potrebno da ponovo podnesete zahtev.");
                        _pendingRequestRepository.Notify(request.Id);

                    }
                    catch (SmtpException ex)
                    {
                        _logger.LogError(ex, ex.Message);
                    }
                }
            }

            machedRequests.Where(x => true);

            foreach (MatchedRequest request in machedRequests)
            {
                if (request.ShouldBeDeleted)
                {
                    _matchedRequestRepository.Delete(request.Id);
                }
            }
        }


        public Task StopAsync(CancellationToken stoppingToken)
        {
            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }

    public interface IScoped { }

    public class Scoped : IScoped { }
}
