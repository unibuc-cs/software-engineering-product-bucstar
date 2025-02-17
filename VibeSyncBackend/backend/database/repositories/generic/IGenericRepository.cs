using backend.Models.Base;

namespace backend.database.repositories.generic;

public interface IGenericRepository<TEntity> where TEntity : BaseEntity
{
    Task<List<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(Guid id);
    Task CreateAsync(TEntity entity);
    Task CreateRangeAsync(IEnumerable<TEntity> entities);
    void Update(TEntity entity);
    void UpdateRange(IEnumerable<TEntity> entities);
    void Delete(TEntity entity);
    bool DeleteById(Guid id);
    void DeleteRange(IEnumerable<TEntity> entities);
    Task<TEntity?>? FindByIdAsync(Guid id);
    Task<bool> SaveAsync();
}